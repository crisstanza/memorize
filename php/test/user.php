<?php
	define('_JEXEC', 1);
	define('JPATH_BASE', '../../../..');

	require_once (JPATH_BASE.'/includes/defines.php');
	require_once (JPATH_BASE.'/includes/framework.php');

	$app = JFactory::getApplication('site');    
	$user = JFactory::getUser();

	print_r($user);

	echo $user->get('id');
	echo $user->get('name');
?>