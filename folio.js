$(window).bind("load",
function() {
    $(".name_box").fadeIn(1000);
    $(".menu_column").fadeIn(1000);
    //Show Home Box when page loads
    focusCurrent("div.side_links a", "div#box1");

    //Clicking On Links - Fade Out All .main Divs, delay everything for 500 ms, Fade Links to half opacity, Fade In Current Link, Fade In Current Content Box
    var fadeable = 1;
    function hidePlinks() {
        $("div.side_links_mini").slideUp("slow").dequeue()
    }
    function fadeMains() {
        $("div.main").fadeOut("slow").fadeTo(550, 1)
        $(".reply").css("display", "none")
    }
    function fadeSideLinks() {
        $("div.side_links a").fadeTo(250, .5).dequeue()
    }
    function focusCurrent(l, b) {
        $(l).fadeTo(250, 1).dequeue()
        $(b).fadeIn("slow",
        function() {
            fadeable = 1;
        })
    }
    function fadeIcons() {
        $("div.icon_holder").fadeTo(250, .75);
    }
    function showPage(l, p) {
        if (fadeable == 1) {
            fadeable = 0;
            $(this).dequeue()
            fadeMains()
            hidePlinks()
            fadeSideLinks()
            focusCurrent(l, p)
        }
    }
    function showPanel(p) {
        $(this).dequeue()
        fadeMains()
        hidePlinks()
        fadeSideLinks()
        $(p).fadeIn("slow");
    }

    $("a#link1").click(function() {
        showPage("div.side_links a", "div#box1")
    })
    $("a#link2").click(function() {
        showPage("a#link2", "div#box2")
        $("div.side_links_mini").slideDown("slow")
    })
    $("a#link3").click(function() {
        showPage("a#link3", "div#box3")
    })
    $("a#link4").click(function() {
        showPage("a#link4", "div#box4")
    })

    $("a#link_Photography").click(function() {
        if (fadeable == 1) {
            fadeable = 0;
            $(this).dequeue()
            fadeMains()
            fadeSideLinks()
            fadeIcons()
            focusCurrent("a#link_Photography", "div#box_Photography");
        }
    })
    $("a#link_Artwork").click(function() {
        if (fadeable == 1) {
            fadeable = 0;
            $(this).dequeue()
            fadeMains()
            fadeSideLinks()
            fadeIcons()
            focusCurrent("a#link_Artwork", "div#box_Artwork");
        }
    })
    $("div.icon_holder").mouseover(function() {
        $(this).fadeTo(150, 1).dequeue()
    })
    $("div.icon_holder").mouseout(function() {
        $(this).fadeTo(300, .75).dequeue()
    })


    //Add To Portfolio
    $("a#link_add").click(function() {
        showPanel("div#box_add")
    })

    //Change Customization Options
    $("a#link_customize").click(function() {
        showPanel("div#box_customization")
    })

    //Change Settings and Info
    $("a#link_settings").click(function() {
        showPanel("div#box_settings")
    })

    //Manage Portfolio
    $("a#link_manage").click(function() {
        showPanel("div#box_manage")
    })

    //Editing Names of Pieces
    $("span.managelist_title").click(function() {
        if (editable == 1) {
            editable = 1;
            var title = $(this).text();
            title_ = title.split('(ID-EDIT-NUM)');
            var id = title_[0];
            //Replace with input box
            $(this).replaceWith('<div style="height:0px;left:18px;top:-20px;position:relative;"<form name="editTitle" action="" enctype="multipart/form-data" method="post"><input name="title_form" type="text" value="' + title_[1] + '" /> <select id="type" name="type"><option selected="selected" value="">Please Choose A Category &nbsp;&nbsp;</option><option disabled="disabled">&nbsp;</option><option value="Artwork">Artwork</option><option value="Photography">Photography</option><option disabled="disabled">&nbsp;</option><option value="Animation" id="animation_select">Animation (Beta)</option></select><input name="id" type="hidden" value="' + id + '" /> <input name="editButton" class="button" type="submit" value="Edit" /></form></div');
        }

    })
    var editable = 1;

    //Hide div w/id extra
    $("#preview").css("display", "none");
    $("#type").click(function() {
        if ($("#animation_select").is(":selected")) {
            $("#preview").slideDown("normal");
        } else {
            $("#preview").slideUp("normal");
        }
    });

    //Login Box
    login_shown = 1;
    $("div.login a#toggle_login").click(function() {
        if (login_shown == 1) {
            $("div.login_box").fadeIn("normal");
            $("a#toggle_login").fadeTo(200, .2);
            login_shown = 0;
        } else {
            $("div.login_box").fadeOut("normal");
            $("a#toggle_login").fadeTo(200, 1);
            login_shown = 1;
        }
    })
});

//Lightbox Viewer
$(document).ready(function() {
    //When you click on something with class, lightbox, it adds the overlay and shows the file that the a href was linked to.
    $(".lightbox").click(function() {
        overlayLink = $(this).attr("href");
        //Show What's in the link
        title = $(this).attr("title");
        //Grab the title
        string = $(this).next(".info").text();
        //Get the parent div's p which contains the date
        elements = string.split("+br");
        window.startOverlay(overlayLink, title, elements[0], elements[3]);
        //Execute the lightbox
        return false;
        //Tells the browser to not actually go to the link when clicked on the a href
    });
});
$(document).ready(function() {
    $(".lightboxSWF").click(function() {
        overlayLink = $(this).attr("href");
        //Show What's in the link
        title = $(this).attr("title");
        //Grab the title
        string = $(this).next(".info").text();
        //Get the parent div's p which contains the date
        elements = string.split("+br");
        window.startOverlaySWF(overlayLink, title, elements[0], elements[1], elements[2]);
        //Execute the lightbox
        return false;
        //Tells the browser to not actually go to the link when clicked on the a href
    });
});

//Image Lightbox
function startOverlay(overlayLink, title, date, id, overlay) {
    //Adds the overlay layer plus the container layer, which will contain the image and text
    if (overlay != 0) {
        $("body").append('<div class="overlay"><span class="close"></span></div><div class="container"></div>')
    } else {
        $("body").append('<div class="container"></div>')
    }

    //Animates the transparent black sheet covering the screen
    $(".overlay").animate({
        "opacity": "0.85"
    },
    450, "linear");

    //Puts the image, title and date into the .container depending on browser type
    if ($.browser.msie) {
        $(".container").html('<img src="' + overlayLink + '" alt="" /><div><p>' + title + '<br /><span>' + date + '</span></p></div>');
    } else {
        $(".container").html('<span class="nav navLeft"></span><span class="nav navRight"></span><img src="' + overlayLink + '" alt="" /><div class="caption"><p>' + title + '<br /><span>' + date + '</span></p></div>');
    }

    //Alows for the removal of the lightbox.
    window.removeOverlay(id);

    //Position the image accordingly.
    $(".container img").load(function() {
        var imgWidth = $(".container img").width() + 2;
        //Plus 2 for the border
        var imgHeight = $(".container img").height() + 2;
        //Plus 2 for the border
        $(".container").css({
            "top": "50%",
            "left": "50%",
            "width": imgWidth,
            "height": imgHeight,
            "margin-top": -(imgHeight / 2),
            "margin-left": -(imgWidth / 2)
            //Position the image in the middle of the screen.
        }).animate({
            "opacity": "1"
        },
        550, "linear",
        function() {
            $(".overlay").css({
                "background-image": "none"
            });
        });

        //Make necessary changes for IE
        if ($.browser.msie) {
            $(".overlay").css({
                "height": "150%"
            });
            $(".container div").css({
                "padding-left": "6px"
            });
            $(".container").css({
                "height": imgHeight + 50
            });
        }

        //Show the actual image and hide stuff		
        $(".container div").fadeTo(2000, 1).fadeTo(1000, .001);
        //Hide the comment after a while.
        //Hover over the comment above.
        $(".container div").hover(
        function() {
            $(this).fadeTo(300, 1).dequeue();
        },
        function() {
            $(this).fadeTo(300, .001).dequeue();
        }
        );
        //Hover Over Nav Links
        $("span.nav").hover(
        function() {
            $(this).fadeTo(200, 1).dequeue();
        },
        function() {
            $(this).fadeTo(200, .001).dequeue();
        }
        );
    });
}

//SWF Lightbox
function startOverlaySWF(overlayLink, title, date, widthpop, heightpop) {
    var imgWidth = widthpop;
    //Plus 2 for the border
    var imgHeight = heightpop;
    //Plus 2 for the border
    //Adds the overlay layer plus the container layer, which will contain the image and text
    $("body")
    .append('<div class="overlay"></div><div class="container"></div>');


    //Animates the transparent black sheet covering the screen
    $(".overlay").animate({
        "opacity": "0.85"
    },
    450, "linear");

    //Puts the image, title and date into the .container
    $(".container").html('<div><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://active.macromedia.com/flash2/cabs/swflash.cab#version=4,0,0,0" id="Flash" width="' + imgWidth + '" height="' + imgHeight + '"> <param name="allowScriptAccess" value="sameDomain"><param name="movie" value="' + overlayLink + '"><param name="quality" value="high"><embed src="' + overlayLink + '" quality="high" width=' + imgWidth + ' height=' + imgHeight + ' name="Flash" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></object></div><div id="titles"><p>' + title + '<span>' + date + '</span></p></div>');

    //Alows for the removal of the lightbox.
    window.removeOverlay();

    //Position the image accordingly.
    $(".container").css({
        "top": "50%",
        "left": "50%",
        "width": imgWidth,
        "height": imgHeight,
        "margin-top": -(imgHeight / 2),
        "margin-left": -(imgWidth / 2)
        //Position the image in the middle of the screen.
    }).animate({
        "opacity": "1"
    },
    550, "linear",
    function() {
        $(".overlay").css({
            "background-image": "none"
        });
    });
    //Show the actual image.		
    $(".container div#titles").fadeTo(2000, 1).fadeTo(1000, .001);
    //Hide the comment after a while.
    $(".container div#titles").hover(
    function() {
        $(".container div#titles").fadeTo(300, 1).dequeue();
    },
    function() {
        $(".container div#titles").fadeTo(300, .001).dequeue();
    }
    );
    //Hover over the comment above.
}

//Remove Lightbox
function removeOverlay(id) {
    // When the user clicks on the overlay, the lightbox goes away.
    $(".overlay, .container img").click(function() {
        $(".container, .overlay").animate({
            "opacity": "0"
        },
        250, "linear",
        function() {
            $(".container, .overlay").remove();
        });
    });
    //Click Next or Previous
    $("span.navRight").click(function() {
        var nextPiece = $("#piece_" + id).next("div").children("a.lightbox");
        if (nextPiece.attr("href") === undefined) {
            $(".container, .overlay").animate({
                "opacity": "0"
            },
            250, "linear",
            function() {
                $(".container, .overlay").remove();
            });
        } else {
            overlayLink = nextPiece.attr("href");
            //Show What's in the link
            title = nextPiece.attr("title");
            //Grab the title
            string = nextPiece.next(".info").text();
            //Get the parent div's p which contains the date
            elements = string.split("+br");
            $(".container").fadeTo(400, 0,
            function() {
                $(this).remove();
                window.startOverlay(overlayLink, title, elements[0], elements[3], 0);
                //Execute the lightbox
            })
        }
    })
    $("span.navLeft").click(function() {
        var nextPiece = $("#piece_" + id).prev("div").children("a.lightbox");
        if (nextPiece.attr("href") === undefined) {
            $(".container, .overlay").animate({
                "opacity": "0"
            },
            250, "linear",
            function() {
                $(".container, .overlay").remove();
            });
        } else {
            overlayLink = nextPiece.attr("href");
            //Show What's in the link
            title = nextPiece.attr("title");
            //Grab the title
            string = nextPiece.next(".info").text();
            //Get the parent div's p which contains the date
            elements = string.split("+br");
            $(".container").fadeTo(400, 0,
            function() {
                $(this).remove();
                window.startOverlay(overlayLink, title, elements[0], elements[3], 0);
                //Execute the lightbox
            })
        }
    })
}