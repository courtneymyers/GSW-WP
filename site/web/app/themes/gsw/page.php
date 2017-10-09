<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * '/gsw/templates/page-pagetitle.twig'
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package GSW
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

$templates = array(
  'page-' . $post->post_name . '.twig',
  'content.twig'
);

Timber::render($templates, $context);
