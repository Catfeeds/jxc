var queryConditions = {
	matchCon: ""
},
	SYSTEM = system = parent.SYSTEM,
	hiddenAmount = !1,
	billRequiredCheck = system.billRequiredCheck,
	THISPAGE = {
		init: function() {
			SYSTEM.isAdmin !== !1 || SYSTEM.rights.AMOUNT_INAMOUNT || (hiddenAmount = !0);
			this.initDom();
			this.loadGrid();
			this.addEvent()
		},
		initDom: function() {
			this.$_matchCon = $("#matchCon");
			this.$_beginDate = $("#beginDate").val(system.beginDate);
			this.$_endDate = $("#endDate").val(system.endDate);
			this.$_matchCon.placeholder();
			this.$_beginDate.datepicker();
			this.$_endDate.datepicker()
		},
		loadGrid: function() {
			function t(t, e, i) {
				var a = '<div class="operating" data-id="' + i.id + '"><a class="ui-icon ui-icon-pencil" title="修改"></a><a class="ui-icon ui-icon-trash" title="删除"></a></div>';
				return a
			}
			function e(t, e, i) {
				//if (150501 === t) return "购货";
				if (1 === t) return "购货";
				a.markRow.push(i.id);
				return "退货"
			}
			var i = Public.setGrid(),
				a = this;
			queryConditions.beginDate = this.$_beginDate.val();
			queryConditions.endDate = this.$_endDate.val();
			a.markRow = [];
			$("#grid").jqGrid({
				//url: "/scm/invPu.do?action=list",
				url: invpu_lists,
				postData: queryConditions,
				datatype: "json",
				autowidth: !0,
				height: i.h,
				altRows: !0,
				gridview: !0,
				multiselect: !0,
				colNames: ["操作", "单据日期", "单据编号", "业务类别", "供应商", "购货金额", "折扣后金额", "已付款金额", "制单人", "审核人", "备注", "销售单号", "订单来源"],
				colModel: [{
					name: "operating",
					width: 60,
					fixed: !0,
					formatter: t,
					align: "center"
				}, {
					name: "billDate",
					index: "billDate",
					width: 100,
					align: "center"
				}, {
					name: "billNo",
					index: "billNo",
					width: 150,
					align: "center"
				}, {
					name: "transType",
					index: "transType",
					width: 100,
					formatter: e,
					align: "center"
				}, {
					name: "contactName",
					index: "contactName",
					width: 200
				}, {
					name: "totalAmount",
					index: "totalAmount",
					hidden: hiddenAmount,
					width: 100,
					align: "right",
					formatter: "currency"
				}, {
					name: "amount",
					index: "amount",
					hidden: hiddenAmount,
					width: 100,
					align: "right",
					formatter: "currency"
				}, {
					name: "rpAmount",
					index: "rpAmount",
					hidden: hiddenAmount,
					width: 100,
					align: "right",
					formatter: "currency"
				}, {
					name: "userName",
					index: "userName",
					width: 80,
					fixed: !0,
					align: "center",
					title: !0,
					classes: "ui-ellipsis"
				}, {
					name: "checkName",
					index: "checkName",
					width: 80,
					hidden: billRequiredCheck ? !1 : !0,
					fixed: !0,
					align: "center",
					title: !0,
					classes: "ui-ellipsis"
				}, {
					name: "description",
					index: "description",
					width: 200,
					classes: "ui-ellipsis"
                                }, {
					name: "sabillno",
					index: "sabillno",
					width: 100,
					classes: "ui-ellipsis"
				}, {
					name: "disEditable",
					label: "不可编辑",
					index: "disEditable",
					hidden: !0
				}],
				cmTemplate: {
					sortable: !1,
					title: !1
				},
				page: 1,
				sortname: "number",
				sortorder: "desc",
				pager: "#page",
				rowNum: 100,
				rowList: [100, 200, 500],
				viewrecords: !0,
				shrinkToFit: !1,
				forceFit: !1,
				jsonReader: {
					root: "data.rows",
					records: "data.records",
					total: "data.total",
					repeatitems: !1,
					id: "id"
				},
				loadComplete: function() {
					var t = a.markRow.length;
					if (t > 0) for (var e = 0; t > e; e++) $("#" + a.markRow[e]).addClass("red")
				},
				loadError: function() {},
				ondblClickRow: function(t) {
					$("#" + t).find(".ui-icon-pencil").trigger("click")
				}
			})
		},
		reloadData: function(t) {
			this.markRow = [];
			$("#grid").jqGrid("setGridParam", {
				url: invpu_lists,			  
				//url: "/scm/invPu.do?action=list",
				datatype: "json",
				postData: t
			}).trigger("reloadGrid")
		},
		addEvent: function() {
			var t = this;
			$(".grid-wrap").on("click", ".ui-icon-pencil", function(t) {
				t.preventDefault();
				var e = $(this).parent().data("id"),
					i = $("#grid").jqGrid("getRowData", e),
					a = 1 == i.disEditable ? "&disEditable=true" : "";
				parent.tab.addTabItem({
					tabid: "purchase-purchase",
					text: "购货单",
					url: invpu_edit+"?id=" + e + "&flag=list"
					//url: "/purchase/purchase.jsp?id=" + e + "&flag=list" + a
				});
				$("#grid").jqGrid("getDataIDs");
				parent.cacheList.purchaseId = $("#grid").jqGrid("getDataIDs")
			});
			$(".grid-wrap").on("click", ".ui-icon-trash", function(t) {
				t.preventDefault();
				if (Business.verifyRight("PU_DELETE")) {
					var e = $(this).parent().data("id");
					$.dialog.confirm("您确定要删除该购货记录吗？", function() {
						//Public.ajaxGet("/scm/invPu.do?action=delete", {
						Public.ajaxGet(invpu_del, { 			   
							id: e
						}, function(t) {
							if (200 === t.status) {
								$("#grid").jqGrid("delRowData", e);
								parent.Public.tips({
									content: "删除成功！"
								})
							} else parent.Public.tips({
								type: 1,
								content: t.msg
							})
						})
					})
				}
			});
			$(".wrapper").on("click", "#print", function(t) {
				t.preventDefault();
				Business.verifyRight("PU_PRINT") && Public.print({
					title: "购货单列表",
					$grid: $("#grid"),
					pdf: "/scm/invPu.do?action=toPdf",
					billType: 10101,
					filterConditions: queryConditions
				})
			});
			
			$(".wrapper").on("click", "#export", function(t) {
				if (Business.verifyRight("PU_EXPORT")) {
					var e = $("#grid").jqGrid("getGridParam", "selarrrow"),
						i = e.join();
					//if (i) $(this).attr("href", "/scm/invSa.do?action=exportInvSa&id=" + i);
					if (i) $(this).attr("href", invpu_export+"?id=" + i);
					else {
						parent.Public.tips({
							type: 2,
							content: "请先选择需要导出的项！"
						});
						t.preventDefault()
					}
				} else t.preventDefault()
			});
			
			 
			if (billRequiredCheck) {
				{
					$("#audit").css("display", "inline-block"), $("#reAudit").css("display", "inline-block")
				}
				$(".wrapper").on("click", "#audit", function(t) {
					t.preventDefault();
					var e = $("#grid").jqGrid("getGridParam", "selarrrow"),
						i = e.join();
					i ? Public.ajaxPost("/scm/invPu.do?action=batchCheckInvPu", {
						id: i
					}, function(t) {
						if (200 === t.status) {
							for (var i = 0, a = e.length; a > i; i++) $("#grid").setCell(e[i], "checkName", system.realName);
							parent.Public.tips({
								content: "审核成功！"
							})
						} else parent.Public.tips({
							type: 1,
							content: t.msg
						})
					}) : parent.Public.tips({
						type: 2,
						content: "请先选择需要审核的项！"
					})
				});
				$(".wrapper").on("click", "#reAudit", function(t) {
					t.preventDefault();
					var e = $("#grid").jqGrid("getGridParam", "selarrrow"),
						i = e.join();
					i ? Public.ajaxPost("/scm/invPu.do?action=rsBatchCheckInvPu", {
						id: i
					}, function(t) {
						if (200 === t.status) {
							for (var i = 0, a = e.length; a > i; i++) $("#grid").setCell(e[i], "checkName", "&#160;");
							parent.Public.tips({
								content: "反审核成功！"
							})
						} else parent.Public.tips({
							type: 1,
							content: t.msg
						})
					}) : parent.Public.tips({
						type: 2,
						content: "请先选择需要反审核的项！"
					})
				})
			}
			$("#search").click(function() {
				queryConditions.matchCon = "请输入单据号或供应商或备注" === t.$_matchCon.val() ? "" : t.$_matchCon.val();
				queryConditions.beginDate = t.$_beginDate.val();
				queryConditions.endDate = t.$_endDate.val();
				THISPAGE.reloadData(queryConditions)
			});
			$("#add").click(function(t) {
				t.preventDefault();
				Business.verifyRight("PU_ADD") && parent.tab.addTabItem({
					tabid: "purchase-purchase",
					text: "购货单",
					//url: "/scm/invPu.do?action=initPur"
					url: invpu_add
				})
			});
			$(window).resize(function() {
				Public.resizeGrid()
			})
		}
	};
THISPAGE.init();