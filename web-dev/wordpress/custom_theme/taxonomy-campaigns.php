
<?php
$topic = get_field('topic');
$business_type = get_field('business_type');
$content_type = get_field('content_type');

$topicString = '';
if ($topic) {
    $topicCount = count($topic);
    foreach ($topic as $key => $value) {
        $topicString .= "category[]=$value";
        $topicString .= $key + 1 == $topicCount ? '' : '&';
    }
}

$businessTypeString = '';
if ($business_type) {
    $business_TyypeCount = count($business_type);
    $businessTypeString = empty($topicString) ? '' : '&';
    foreach ($business_type as $key => $value) {
        $businessTypeString .= "business-type[]=$value";
        $businessTypeString .= $key + 1 == $business_TyypeCount ? '' : '&';
    }
}

$contentTypeString = '';
if ($content_type) {
    $content_TypeCount = count($content_type);
    $contentTypeString =
        empty($topicString) && empty($businessTypeString) ? '' : '&';
    foreach ($content_type as $key => $value) {
        $contentTypeString .= "content-type[]=$value";
        $contentTypeString .= $key + 1 == $content_TypeCount ? '' : '&';
    }
}

$domain = get_option('upload_url_path');
if ($domain) {
    $domain = str_replace('/wp-content/uploads', '', $domain);
    $url = "$domain/blog/?$topicString$businessTypeString$contentTypeString";

    wp_redirect($url);
    exit();
}

