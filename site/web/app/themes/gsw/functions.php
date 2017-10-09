<?php
/**
 * GSW theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package GSW
 */

if (!class_exists('Timber')) {
  add_action('admin_notices', function() {
    echo '<div class="error">'
      . '<p>The GSW theme requires the Timber plugin be activated. '
      . 'Activate the plugin at: '
      . '<a href="' . esc_url(admin_url('plugins.php#timber')) . '">'
      . esc_url(admin_url('plugins.php'))
      . '</a></p></div>';
  });

  add_filter('template_include', function($template) {
    return get_stylesheet_directory() . '/templates/timber-inactive.html';
  });

  return;
}

Timber::$dirname = 'templates';

class GSWSite extends TimberSite {
  function __construct() {
    add_theme_support('post-formats');
    add_theme_support('post-thumbnails');
    // add_theme_support('custom-background');
    // add_theme_support('custom-header');
    // add_theme_support('custom-logo');
    add_theme_support('automatic-feed-links');
    add_theme_support('menus');
    add_theme_support('html5', array('search-form', 'gallery', 'caption'));
    // add_theme_support('title-tag');
    add_theme_support('customize-selective-refresh-widgets');

    add_action('init', array($this, 'register_post_types'));
    add_action('init', array($this, 'register_taxonomies'));
    add_filter('get_twig', array($this, 'add_to_twig'));
    add_filter('timber_context', array($this, 'add_to_context'));

    parent::__construct();
  }

  function register_post_types() {
    // custom post types
  }

  function register_taxonomies() {
    // custom taxonomies
  }

  /* custom filter added to Twig */
  function append_probably_twig_filter($text) {
    $text .= ' (probably)';
    return $text;
  }

  function add_to_twig($twig) {
    /* custom functions added to twig */
    $twig->addExtension(new Twig_Extension_StringLoader());
    $twig->addFilter(new Twig_SimpleFilter('probably',
      array($this, 'append_probably_twig_filter')
    ));
    return $twig;
  }

  function add_to_context($context) {
    $context['clover'] = '🍀';
    $context['menu'] = new TimberMenu();
    $context['site'] = $this;
    return $context;
  }
}

new GSWSite();
