<?php
/**
 * Search results page
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package GSW
 */

$context = Timber::get_context();
$context['posts'] = Timber::get_posts();
$context['title'] = 'Search results for '. get_search_query();

$templates = array('search.twig', 'archive.twig', 'index.twig');

Timber::render($templates, $context);
