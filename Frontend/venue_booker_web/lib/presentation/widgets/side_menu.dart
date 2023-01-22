import 'package:easy_sidemenu/easy_sidemenu.dart';
import 'package:flutter/material.dart';

List<SideMenuItem> sideMenuItems = [
  SideMenuItem(
    // Priority of item to show on SideMenu, lower value is displayed at the top
    priority: 0,
    title: 'All Organisations',
    onTap: (page) => page.jumpToPage(0),
    icon: const Icon(Icons.people),
    badgeContent: const Text(
      '3',
      style: TextStyle(color: Colors.white),
    ),
  ),
  SideMenuItem(
    priority: 1,
    title: 'Upcoming Events',
    onTap: (page) => page.jumpToPage(1),
    icon: const Icon(Icons.calendar_month),
  ),
  SideMenuItem(
    priority: 2,
    title: 'Logout',
    onTap: (page) {},
    icon: const Icon(Icons.logout),
  ),
];