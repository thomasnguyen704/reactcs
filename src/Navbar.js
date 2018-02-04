import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default ()=> {
	<Menu mode="horizontal">
		<Menu.Item key="mail">
			<Icon type="mail"/>
			Navigation One
		</Menu.Item>
		<Menu.Item key="app">
			<Icon type="appstore"/>
			Navigation Two
		</Menu.Item>
	</Menu>
}