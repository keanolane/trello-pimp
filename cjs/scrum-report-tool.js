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
 * @typedef {Object} Report
 * @property {number} cards - The total amount of cards done for this sprint.
 * @property {number} points - The total amount of points done for this sprint.
 * @property {Member[]} members - The stats split by member.
 */
class Report {
    /**
     * CardItem constructor.
     *
     * @param props
     */
    constructor(props) {
        this.cards = null;
        this.points = null;
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
        console.log('%c SCRUM REPORT FOR CURRENT SPRINT ', this.getTitleStyle());

        console.log('%c Global ', this.getSubTitleStyle());
        console.log('%c Cards: ' + this.cards, this.getNormalTextStyle());
        console.log('%c Points: ' + this.points, this.getNormalTextStyle());
        console.log('%c Members: ' + this.members.length, this.getNormalTextStyle());

        var reportClass = this;

        $.each(this.members, function(index, member) {
            console.log('%c ' + member.name + ' ', reportClass.getSubTitleStyle());
            console.log('%c Cards: ' + member.cards, reportClass.getNormalTextStyle());
            console.log('%c Points: ' + member.points, reportClass.getNormalTextStyle());
        });
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

var startList = 'QA';

/**
 * Builds and prints the Scrum Report for current board.
 */
function getScrumReport() {
    /** @type {Report} */
    var report = new Report();
    var doneLists = getDoneLists();
    var members = [];

    $.each(doneLists, function(index, $list) {
        var listPoints = getTotalPointsForList($list);

        processCardsInList(report, members, $list);

        report.addPoints(listPoints);
    });

    for (var index in members) {
        report.addMember(members[index]);
    }

    report.printReport();
}

/**
 * Returns the list of Trello lists needed for Scrum Report.
 *
 * @returns {jQuery[]}
 */
function getDoneLists() {
    var $lists = $(listSelector);
    var firstDoneListReached = false;
    var doneLists = [];

    $.each($lists, function(index, list) {
        var $list = $(list);
        var $title = $($list.find(listTitleSelector));

        if ($title.text() == startList) {
            firstDoneListReached = true;
        }

        if (firstDoneListReached) {
            doneLists.push($list);
        }
    });

    return doneLists;
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
 * @param {Report} report
 * @param {object[]} members
 * @param {jQuery} $list
 */
function processCardsInList(report, members, $list) {
    var $cards = $($list.find(cardSelector));

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

        report.addCard();
    });
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

    return (cardMembersCount) ? cardPoints / cardMembersCount : cardPoints;
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
