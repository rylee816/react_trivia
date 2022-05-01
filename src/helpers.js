// Create function to decode the html (some edge cases missing)

export default function decodeHtml(str){
    var map =
    {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&eacute;': "é",
        '&rsquo;': "'",
        '&uuml;': 'ü',
        '&pi;': '	π',
        '&Prime;': '′',
        '&iacute;': 'í',
        '&sup2;': '²',
        '&ouml;': 'ö',
        '&deg;': '°',
        '&shy;': '-',
        '&aacute;': 'á',
        '&Uuml': 'Ü',
        '&micro;': 'µ',
        '&ldquo;': '“',
        '&rdquo;': "”",
        '&oacute;': 'ó',
        '&ecirc;': 'ê',
        '&uacute;': 'ú',
        '&Delta;': 'Δ',
        '&Eacute;': 'É',
        '&ndash;': '–',
        '&lsquo;': '‘',
        '&atilde;': 'ã'
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&eacute;|&rsquo;|&uuml;|&pi;|&Prime;|&iacute;|&sup2;|&ouml;|&deg;|&shy;|&aacute;|&Uuml;|&micro;|&ldquo;|&rdquo;|&oacute;|&ecirc;|&uacute;|&Delta;|&Eacute;|&ndash;|&lsquo;|&atilde;/g, (m) => map[m]);
}