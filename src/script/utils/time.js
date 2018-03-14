
export function currentTime() {
    var date = new Date();

    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
    var hh = date.getHours();
    var minutes = date.getMinutes();

    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd,
            (hh>9 ? '' : '0') + hh,
            (minutes>9 ? '' : '0') + minutes
           ].join('.');
};
