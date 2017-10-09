<?php
/**
 * The Template for displaying all single posts
 *
 * To generate specific templates for your posts you can use:
 * '/gsw/templates/post-id.twig' or '/gsw/templates/post-type.twig'
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package GSW
 */

$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;

$templates = array(
  'post-' . $post->ID . '.twig',
  'post-' . $post->post_type . '.twig',
  'content.twig'
);

Timber::render($templates, $context);
