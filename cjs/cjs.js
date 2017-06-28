function applyStyle() {
    /*
     * Configuration
     */

    // key: title pattern to match
    // value: class to attach to the board
    var boardStyles = {
        'friction free': 'friction-free',
        'bau': 'bau',
        'engineering': 'engineering'
    }

    // key: list pattern to match
    // value: class to attach to the board
    var listStyles = {
        '^sprint|^current': 'cyan',
        'blocked|hold': 'red',
        'doing|play|progress': 'orange',
        'writing spec': 'yellow',
        'ready for sizing': 'purple',
        'uat|validating|qa': 'pink',
        'dev complete': 'blue',
        'ready to deploy': 'dark-green',
        'done|live': 'green'
    }

    // Dealing with boards style

    var title = $('title').html().toLowerCase();

    var className = null;

    for (var key in boardStyles) {
        if (title.match(key)) {
            className = boardStyles[key];

            break;
        }
    }

    if (className) {
        $('.board-wrapper').addClass(className);
    }

    // Dealing with lists style

    var $headersList = $('.list-header-name-assist');

    $.each($headersList, function(index, header) {
        var $header = $(header);
        var listName = $header.html().toLowerCase();
        var $list = $header.closest('.list');
        var className = null;

        for (var key in listStyles) {
            if (listName.match(key)) {
                className = listStyles[key];

                break;
            }
        }

        if (className) {
            $list.addClass(className);
        }
    });
}

$('title').on('DOMSubtreeModified', applyStyle);
$(document).ready(applyStyle);
