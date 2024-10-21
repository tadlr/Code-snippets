import $ from 'jquery';
import Scrollbar from 'smooth-scrollbar';

export const init = () => {
    $('[data-scroll-container-inner]').each((i,e) => {
        const scrollbar = Scrollbar.init(e, {
            alwaysShowTracks: true
        });
        // console.log(scrollbar.contentEl)
    })
}