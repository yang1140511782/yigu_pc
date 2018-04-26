<?php 
	$username = $_GET["username"];
	$password = $_GET["password"];
	/*****连接用户*****/
	//创建连接
	mysql_connect("localhost:3306", "root", "");
	//选择数据库
	mysql_select_db("yang");
	//编码
	mysql_query("set character set 'utf8'");
	mysql_query("set names'utf8'");
	//创建查询sql语句
	$sql = "SELECT * FROM project WHERE username='$username' AND password='$password'";
	//执行收起来了命令
	$result = mysql_query($sql);
	//处理查询结果集
	if($row = mysql_fetch_array($result, MYSQL_ASSOC))
		echo json_encode($row);
	else
		echo "<script>alert('用户名错误')</script>";

	//关闭数据库链接
 ?>