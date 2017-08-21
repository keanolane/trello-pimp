/* -----------------------------
 * ----- Class definitions -----
 * ----------------------------- */

/**
 * @typedef {Object} Member
 * @property {string} name - The member's name.
 * @property {number} points - The total amount of points done for this sprint.
 * @property {number} cards - The total amount of cards done for this sprint.
 */
class Member {
    /**
     * CardItem constructor.
     *
     * @param props
     */
    constructor(props) {
        this.name = null;
        this.points = 0;
        this.cards = 0;

        this.assign(props);
    }

    /**
     * Assigns properties.
     *
     * @param {object} props
     */
    assign(props) {
        if (props) {
            if (props.name) {
                this.name = props.name;
            }

            if (props.points) {
                this.points = props.points;
            }

            if (props.cards) {
                this.cards = props.cards;
            }
        }
    }

    /**
     * Increments the cards counter.
     */
    addCard() {
        this.cards++;
    }

    /**
     * Increments the points counter with the specified value.
     *
     * @param {number} points
     */
    addPoints(points) {
        this.points += points;
    }
}

/**
 * @typedef {Object} List
 * @property {number} cards - The total amount of cards done for this sprint.
 * @property {number} points - The total amount of points done for this sprint.
 * @property {Member[]} members - The stats split by member.
 */
class List {
    /**
     * CardItem constructor.
     *
     * @param props
     */
    constructor(props) {
        this.name = null;
        this.cards = 0;
        this.points = 0;
        this.members = [];

        this.assign(props);
    }

    /**
     * Assigns properties.
     *
     * @param {object} props
     */
    assign(props) {
        if (props) {
            if (props.name) {
                this.name = props.name;
            }

            if (props.cards) {
                this.cards = props.cards;
            }

            if (props.points) {
                this.points = props.points;
            }

            if (props.members) {
                this.members = props.members;
            }
        }
    }

    /**
     * Increments the cards counter.
     */
    addCard() {
        this.cards++;
    }

    /**
     * Increments the points counter with the specified value.
     *
     * @param {number} points
     */
    addPoints(points) {
        this.points += points;
    }

    /**
     * Adds a Member to the members list.
     *
     * @param {Member} member
     */
    addMember(member) {
        this.members.push(member);
    }
}

/**
 * @typedef {Object} Report
 * @property {number} cards - The total amount of cards done for this sprint.
 * @property {number} points - The total amount of points done for this sprint.
 * @property {List[]} lists - The stats split by list.
 * @property {Member[]} members - The stats split by member.
 */
class Report {
    /**
     * CardItem constructor.
     *
     * @param props
     */
    constructor(props) {
        this.cards = 0;
        this.points = 0;
        this.lists = [];
        this.members = [];

        this.assign(props);
    }

    /**
     * Assigns properties.
     *
     * @param {object} props
     */
    assign(props) {
        if (props) {
            if (props.cards) {
                this.cards = props.cards;
            }

            if (props.points) {
                this.points = props.points;
            }

            if (props.lists) {
                this.lists = props.lists;
            }

            if (props.members) {
                this.members = props.members;
            }
        }
    }

    /**
     * Increments the cards counter.
     */
    addCard() {
        this.cards++;
    }

    /**
     * Increments the points counter with the specified value.
     *
     * @param {number} points
     */
    addPoints(points) {
        this.points += points;
    }

    /**
     * Adds a List to the lists list.
     *
     * @param {List} list
     */
    addList(list) {
        this.lists.push(list);
    }

    /**
     * Adds a Member to the members list.
     *
     * @param {Member} member
     */
    addMember(member) {
        this.members.push(member);
    }

    /**
     * Returns the console styling for titles.
     *
     * @returns {string}
     */
    getTitleStyle() {
        return 'font-size: 26px; font-weight: bold; line-height: 30px;';
    }

    /**
     * Returns the console styling for subtitles.
     *
     * @returns {string}
     */
    getSubTitleStyle() {
        return 'font-size: 18px; font-weight: bold; line-height: 22px; background: #262626; color: white;';
    }

    /**
     * Returns the console styling for headers.
     *
     * @returns {string}
     */
    getHeaderStyle() {
        return 'font-size: 14px; font-weight: bold; line-height: 18px; color: #262626;';
    }

    /**
     * Returns the console styling for normal text.
     *
     * @returns {string}
     */
    getNormalTextStyle() {
        return 'font-size: 14px;';
    }

    /**
     * Prints the report details in the console.
     */
    printReport() {
        console.log('===================================');
        console.log('%c SCRUM REPORT FOR CURRENT SPRINT ', this.getTitleStyle());
        console.log('===================================');

        console.log('%c Global ', this.getSubTitleStyle());
        console.log('%c Cards: ' + this.cards, this.getNormalTextStyle());
        console.log('%c Points: ' + this.points, this.getNormalTextStyle());
        console.log('%c Lists: ' + this.lists.length, this.getNormalTextStyle());
        console.log('%c Members: ' + this.members.length, this.getNormalTextStyle());

        var reportClass = this;

        if (this.lists.length === 0) {
            console.error('No lists in report');
        } else {
            $.each(this.lists, function(index, list) {
                console.log('%c ' + list.name + ' ', reportClass.getSubTitleStyle());
                console.log('%c Cards: ' + list.cards, reportClass.getNormalTextStyle());
                console.log('%c Points: ' + list.points, reportClass.getNormalTextStyle());

                if (list.members.length === 0) {
                    console.error('No members in list');
                } else {
                    $.each(list.members, function (subIndex, member) {
                        console.log('%c ' + member.name + ' ', reportClass.getHeaderStyle());
                        console.log('%c Cards: ' + member.cards, reportClass.getNormalTextStyle());
                        console.log('%c Points: ' + member.points, reportClass.getNormalTextStyle());
                    });
                }
            });
        }
        console.log('===============');
        console.log('===== END =====');
        console.log('===============');
    }
}

/* ----------------------
 * ----- Main Logic -----
 * ---------------------- */

var listSelector = '.list-wrapper:not(.mod-add)';
var listTitleSelector = '.list-header h2';
var listScrummerPointsSelector = '.scrummer-list-points';
var cardSelector = '.list-card';
var cardScrummerPointsSelector = '.scrummer-points';
var cardMemberAvatarSelector = '.member-avatar';

/**
 * Builds and prints the Scrum Report for current board.
 */
function getScrumReport() {
    /** @type {Report} */
    var report = new Report();
    var allLists = $(listSelector);

    $.each(allLists, function(index, item) {
        var $list = $(item);
        var listName = $($list.find(listTitleSelector)).text();
        var listPoints = getTotalPointsForList($list);

        var list = new List({
            name: listName,
            points: listPoints
        });

        processCardsInList(list, $list);

        report.addList(list);
        report.addPoints(listPoints);

        for (var i=0; i<list.cards; i++) {
            report.addCard();
        }
    });

    for (var i in report.lists) {
        var list = report.lists[i];

        for (var j in list.members) {
            var member = list.members[j];

            if (report.lists.findIndex(findMember, member) === -1) {
                report.addMember(member);
            }
        }
    }

    report.printReport();
}

/**
 * Filter callback to find a member in a members list.
 *
 * @param {Member} item
 * @param {Member} member
 * @returns {bool}
 */
function findMember(item, member) {
    return item.name === member.name;
}

/**
 * Returns the total of points spent in specified list.
 *
 * @param {jQuery} $list
 * @returns {number}
 */
function getTotalPointsForList($list) {
    var $listPoints = $($list.find(listScrummerPointsSelector));
    var totalListPoints = 0;

    if ($listPoints.length === 0) {
        var $title = $($list.find(listTitleSelector));

        console.error('No points found for list ' + $title.text());
    } else {
        totalListPoints = parseInt($($list.find(listScrummerPointsSelector)).text())
    }

    return totalListPoints;
}

/**
 * Process cards data in specified list.
 *
 * @param {List} list
 * @param {jQuery} $list
 */
function processCardsInList(list, $list) {
    console.info('Processing cards in list "' + list.name + '"');

    var $cards = $($list.find(cardSelector));
    var members = [];

    $.each($cards, function(index, card) {
        var $card = $(card);
        var cardUrl = $card.attr('href');
        var $cardPoints = $($card.find(cardScrummerPointsSelector));
        var $cardMembers = $($card.find(cardMemberAvatarSelector));
        var pointsPerMember = 0;

        if ($cardMembers.length === 0) {
            console.error('Card has no members: ' + document.location.origin + cardUrl);
        } else {
            if ($cardPoints.length === 0) {
                console.error('Card has no points: ' + document.location.origin + cardUrl);
            } else {
                pointsPerMember = calcPointsPerMember($cardPoints, $cardMembers);
            }

            processMembers(members, $cardMembers, pointsPerMember);
        }

        list.addCard();
    });

    for (var i in members) {
        list.addMember(members[i]);
    }
}

/**
 * Returns the average points per user for specified card.
 *
 * @param {jQuery} $cardPoints
 * @param {jQuery} $cardMembers
 * @returns {number}
 */
function calcPointsPerMember($cardPoints, $cardMembers) {
    var cardPoints = parseInt($cardPoints.text());
    var cardMembersCount = $cardMembers.length;

    var points = (cardMembersCount) ? cardPoints / cardMembersCount : cardPoints;

    return Math.ceil(points);
}

/**
 * Process members data in specified card.
 *
 * @param {object[]} members
 * @param {jQuery} $cardMembers
 * @param {number} pointsPerMember
 */
function processMembers(members, $cardMembers, pointsPerMember) {
    $.each($cardMembers, function(index, member) {
        var memberName = $(member).attr('title');

        if (!members[memberName]) {
            members[memberName] = new Member({
                name: memberName
            })
        }

        var currentMember = members[memberName];

        currentMember.addPoints(pointsPerMember);
        currentMember.addCard();
    });
}
