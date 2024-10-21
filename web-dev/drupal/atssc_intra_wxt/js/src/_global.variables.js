/*
    The following is the global screen sizes and media queries.
    It's leveraging the Bootstrap screen sizes, so if you change
    a size in the scss, then the equivalent variable should be adjusted here as well.
    This follows the same naming convention as the scss, but formatted for javascript.
    For reference on variables see the bootstrap variables.scss file starting at line
    286.
*/
// Extra small screen / phone
var screen_xs = "480px";
var screen_xs_min = screen_xs;
// Small screen / tablet
var screen_sm = "768px";
var screen_sm_min = screen_sm;
// Medium screen / desktop
var screen_md = "992px";
var screen_md_min = screen_md;
// Large screen / wide desktop
var screen_lg = "1200px";
var screen_lg_min = screen_lg;
// So media queries don't overlap when required, provide a maximum
var screen_xs_max = parseInt(screen_sm_min) - 1 + "px";
var screen_sm_max = parseInt(screen_md_min) - 1 + "px";
var screen_md_max = parseInt(screen_lg_min) - 1 + "px";

// Default Media Queries
var media_xs_max = window.matchMedia(
  "(max-width:" + screen_xs_max + ")"
).matches;
var media_sm_min = window.matchMedia(
  "(min-width:" + screen_sm_min + ")"
).matches;
var media_sm_max = window.matchMedia(
  "(max-width:" + screen_sm_max + ")"
).matches;
var media_md_min = window.matchMedia(
  "(min-width:" + screen_md_min + ")"
).matches;
var media_md_max = window.matchMedia(
  "(max-width:" + screen_md_max + ")"
).matches;
var media_lg_min = window.matchMedia(
  "(min-width:" + screen_lg_min + ")"
).matches;
