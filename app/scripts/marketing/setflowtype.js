
/*BOTH*/
function setflowtype() {

    $('.customer').flowtype({ /* QUOTE */
        fontRatio: 18,
        minFont: 14,
        maxFont: 18,
        maximum: 500

    });
    $('.crumb-text, .loading-msg').flowtype({
      fontRatio: 18,
      minFont:18,
      maxFont: 18,
      maximum: 500

    })
    /* QUOTE
    $('.customer2').flowtype({
        fontRatio: 27,
        minFont: 14,
        maxFont: 30,
        minumum: 500
    });  */
//    $('.input-group').flowtype({
//        fontRatio: 9,
//        minFont: 9,
//        maxFont: 20
//    })

    $('.share').flowtype({
        fontRatio: 25,
        minFont: 9,
        maxFont: 30
    });

    /* MOBILE */

    $('.mobile').flowtype({
        fontRatio: 20,
        minFont: 9,

    });

    $('.mobile .btn-lg').flowtype({
        fontRatio: 13,
        minFont: 9,

    });

    $('.mobile .quotewidget h2').flowtype({
        fontRatio: 7,
        minFont: 9,

    });
    $('.mobile .quotewidget h3').flowtype({
        fontRatio: 9,
        minFont: 9,

    });


    $('.mobile .quotewidget .input-group').flowtype({
        fontRatio: 12,
        minFont: 9,
    });


    /*DESKTOP*/

    $('.carousel').flowtype({
        fontRatio: 30
    });
    $('.desktop .quotewidget').flowtype({
        fontRatio: 12
    });
    $('.desktop .quotewidget p').flowtype({
        fontRatio: 12
    });
    $('.desktop .quotewidget input').flowtype({
        fontRatio: 10,
        minFont: 15
    });
    $('.desktop .quotewidget h2').flowtype({
        fontRatio: 9
    });
    $('.front-icon-row h3').flowtype({
        fontRatio: 7
    });
    $('.front-icon-row h4').flowtype({
        fontRatio: 10
    });
}
