
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

const convertToCSV = (arr) => {
    const headers = Object.keys(arr[0]).map(escapeCSVValue).join(',');
    const rows = arr.map(obj => Object.values(obj).map(escapeCSVValue).join(','));
    return [headers, ...rows].join('\n');
};


const escapeCSVValue = (value) => {
    if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
};

var myInterval = setInterval(function(){

    if ($('button.btn-blue')[0].classList.contains('disabled')){

        console.warn('End of list');
        clearInterval(myInterval);
        getRatings();
        
    }else{
    
        $('button.btn-blue').click();
        console.warn('Clicked Next.')
        
    };

}, 500);

var ratingsArr = [];

function getRatings(){

    var table = $('ul.structural.retable.stdHeight')[0];
    var rows = $(table).find('li');
    console.log(rows);

    $(rows).each(function(index,element){

        var dateVal = $(element).find('div.date').text();
        var name = $(element).find('div.title').text();
        var rating = $(element).find('button[arialabel*="Already rated:"]').attr('data-rating');
        //.attr('data-rating');
        console.warn(dateVal+' = '+name+' = '+rating);

        ratingsArr.push({
            'name':name,
            'date':dateVal,
            'rating':rating
        })
        
    });


    var csvString = convertToCSV(ratingsArr);

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Generate a download link
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.href = URL.createObjectURL(blob);
    link.download = `MyNetflixRatings_${timestamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


}

