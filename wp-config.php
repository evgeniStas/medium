<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'medium');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'dd429glk'); //dd429glk

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '<%)>n`cMw8#00?? D;}l+RkE|+iiqh!yjf#_*KG@j3 S@S;bY1RHJ!g!R1T0V^1r');
define('SECURE_AUTH_KEY',  'rU~=z$MKpK>ik :I!:$ziuPb=|+&A(_qPpr;$7`S_?sHiWZJ+awPLv+<4z9=wyW ');
define('LOGGED_IN_KEY',    '@IWP+HJ2s0Bo~$!(L6YL} R<s/.?1Fou7rL][4>Ld`^jW0KZ/{k~0RDw0Pq/] .b');
define('NONCE_KEY',        '?p4yW&tdwSV5C%<|=|D?v5VhLY>vfSzuBX(B)1axX@Qk+<:#}PQcluUUN*>gL+YO');
define('AUTH_SALT',        'p/DJZ6i3JsZ@3B4~?( LpjRdlVzF(&r XM&LkvOox7}Gtl4@9)L=}Y*D&N!neb.U');
define('SECURE_AUTH_SALT', 'h]_u{4CSA3c</7I_2S{-5#^^#=LV:l8kkgnE?}rG&?QX?B0fb;7^9?Bd$bKP_KXd');
define('LOGGED_IN_SALT',   'bBSq+5gV20Sv9627f!c~iMj&w;0a|3q.8-fH4c7U2gW>c$A%_%sIeN<dOp`!o:Rj');
define('NONCE_SALT',       '7V(G:st~)&d}fU=[)n%KwAZ6zv6p~h%<7I8@5C*MX-3`SSZy+J*uMr #)HstFDGn');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
