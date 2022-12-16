<?php

// This script resets database to an empty state, but with the tables we want.

$db = new SQLite3('database.sqlite');

// Remove any existing data
$drop_old_users_table = $db->query('DROP TABLE IF EXISTS users');
$drop_old_buys_table = $db->query('DROP TABLE IF EXISTS buyorders');
$drop_old_sells_table = $db->query('DROP TABLE IF EXISTS sellorders');
$drop_old_portfolio_table = $db->query('DROP TABLE IF EXISTS portfolios');

// Create new tables and associations
$create_users_table = $db->query('CREATE TABLE users(username text, pass text)');
$create_buys_table = $db->query('CREATE TABLE buyorders(ordertime timestamp, quantity integer, ticker text, userid integer)');
$create_sells_table = $db->query('CREATE TABLE sellorders(ordertime timestamp, quantity integer, ticker text, userid integer)');
$create_portfolio_table = $db->query('CREATE TABLE portfiolios(userid integer, ticker text, quantity integer, updated timestamp)');