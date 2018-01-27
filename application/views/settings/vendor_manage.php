<?php if(!defined('BASEPATH')) exit('No direct script access allowed');?>
<!doctype html>
<html>
<head>
    
<?php
include dirname(dirname(__FILE__))."\common\head.html";;
?>

<style>
body{background: #fff;}
.mod-form-rows .label-wrap{font-size:12px;}
.mod-form-rows .row-item {padding-bottom: 15px;margin-bottom: 0;}/*兼容IE7 ，重写common的演示*/
.manage-wrapper{margin:20px auto 10px;width:600px;}
.manage-wrap .ui-input{width: 198px;}
.base-form{*zoom: 1;}
.base-form:after{content: '.';display: block;clear: both;height: 0;overflow: hidden;}
.base-form li{float: left;width: 290px;}
.base-form li.odd{padding-right:20px;}
.base-form li.last{width:350px}
.manage-wrap textarea.ui-input{width: 588px;height: 32px;overflow:hidden;}
#receiveFunds,#periodReceiveFunds,#taxRate{text-align: right;}
.contacters{margin-bottom: 10px;}
.contacters h3{margin-bottom: 10px;font-weight: normal;}
.remark .row-item{padding-bottom:0;}
.mod-form-rows .ctn-wrap{overflow: visible;;}
</style>
</head>
<body>
<div class="manage-wrapper">
    <div id="manage-wrap" class="manage-wrap">
    	<form id="manage-form" action="">
    		<ul class="mod-form-rows base-form cf" id="base-form">
    			<li class="row-item odd">
    				<div class="label-wrap"><label for="number">供应商编号</label></div>
    				<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="number" id="number"></div>
    			</li>
    			<li class="row-item">
    				<div class="label-wrap"><label for="name">供应商名称</label></div>
    				<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="name" id="name"></div>
    			</li>
    			<li class="row-item odd row-category">
    				<div class="label-wrap"><label for="category">供应商类别</label></div>
    				<div class="ctn-wrap"><span id="category"></span></div>
    			</li>
    			<li class="row-item" style="display:none">
    				<div class="label-wrap"><label for="date">余额日期</label></div>
    				<div class="ctn-wrap"><input type="text" value="" class="ui-input ui-datepicker-input" name="date" id="date" /></div>
    			</li>
    			<li class="row-item odd">
    				<div class="label-wrap"><label for="receiveFunds">期初应付款</label></div>
    				<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="receiveFunds" id="receiveFunds"></div>
    			</li>
    			<li class="row-item">
    				<div class="label-wrap"><label for="periodReceiveFunds">期初预付款</label></div>
    				<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="periodReceiveFunds" id="periodReceiveFunds"></div>
    			</li>
    			<li class="row-item last">
    				<div class="label-wrap"><label for="taxRate">增值税税率</label></div>
    				<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="taxRate" id="taxRate"><span>%</span></div>
    			</li>
    		</ul>
    		<div class="contacters">
    			<h3 class="dn">联系方式</h3>
    			<div class="grid-wrap">
				  <table id="grid">
				  </table>
				  <div id="page"></div>
				</div>
    		</div>
    		<ul class="mod-form-rows remark">
    			<li class="row-item">
    				<!-- <div class="label-wrap"><label for="note">备注</label></div> -->
    				<div class="ctn-wrap"><textarea name="" id="note" class="ui-input ui-input-ph">添加备注信息</textarea></div>
    			</li>
    		</ul>
    	</form>
    </div>
</div>
<script src="<?=skin_url()?>/js/dist/vendorManage.js?2"></script>
</body>
</html>