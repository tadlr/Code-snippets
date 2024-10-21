function drawInfobox(category, infoboxContent, json, i){

    if(json.data[i].color)          { var color = json.data[i].color }
        else                        { color = '' }
    if( json.data[i].price )        { var price = '<div class="price StudentName">' + json.data[i].title +  '</div>' }
        else                        { price = '' }
     if( json.data[i].university )        { var university = '<div class="StudentUniversity">' + json.data[i].university +  '</div>' }
        else                        { price = '' }
    if(json.data[i].id)             { var id = json.data[i].id }
        else                        { id = '' }
    if(json.data[i].MapIcon)             { var MapIcon = json.data[i].MapIcon }
        else                        { id = '' }
    if(json.data[i].UsrSearchCategory)             { var UsrSearchCategory = json.data[i].UsrSearchCategory }
        else                        { id = '' }
    if(json.data[i].url)            { var url = json.data[i].url }
        else                        { url = '' }
    if(json.data[i].type)           { var type = '<div class="StudentType">' + json.data[i].type +  '</div>' }
        else                        { type = '' }
    if(json.data[i].title)          { var title = json.data[i].title }
        else                        { title = '' }
    if(json.data[i].location)       { var location = '<div class="StudentLocation">' + json.data[i].location +  '</div>' }
        else                        { location = '' }
    if(json.data[i].gallery[0])     { var gallery = json.data[i].gallery[0] }
        else                        { gallery[0] = '../img/default-item.jpg' }

    var ibContent = '';
    ibContent =
    '<div class="infobox ' + color + '">' +
        '<div class="inner">' +
            '<div class="image">' +
                '<div class="item-specific">' + drawItemSpecific(category, json, i) + '</div>' +
                '<a href="' + url +  '"><div class="overlay">' +
                    '<div class="wrapper">' +
                        /*'<a href="#" class="quick-view" data-toggle="modal" data-target="#modal" id="' + id + '">Quick View</a>' +
                        '<hr>' + */
                        '<a href="' + url +  '" class="detail"><i class="' + json.data[i].MapIcon + '"> </i> View profile</a>' +
                    '</div>' +
                '</div></a>' +
                '<a href="' + url +  '" class="description">' +
                    '<div class="meta">' +
                        price +
                        '<p class="UserType"><i class="' + json.data[i].MapIcon + ' IconMapBox"> </i> ' + json.data[i].UsrSearchCategory + '' /* +  location +*/ /* university */ + '</p>' + 
                        /* '<h2>' + title +  '</h2>' + */
                        '<figure>' + /* location +*/ university + '</figure>' +      
                        '<figure>' + type + '</figure>' +  
                        '<i class="fa fa-angle-right"></i>' +
                    '</div>' +
                '</a>' +
                '<img src="' + gallery +  '">' +
            '</div>' +
        '</div>' +
    '</div>';

    return ibContent;
}