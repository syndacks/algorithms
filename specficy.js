var specify = (function () {

    // pubic object that will eventually get returned to user
    var public    = {};
    // private object for regex calculations
    var private   = {};


    private.regex = {

        // ids
        b: /#[a-z]+/gi,

        // classes and attributes
        c: /\.[a-z]+|\[[^\]]*\]/gi,

        // tags and pseudo classes
        d: /(?:^| |>|\+|~)+([a-z_-]+)|(?:\:([a-z]+))/gi

    };

    //calculate method gets added to public
    public.calculate = function (selector) {

        //console.log('calculate(' + selector + ')');

        //values is score
        var values = {a: 0,  b: 0,  c: 0,  d: 0};
        //if regeex matches
        var matches   = {a: [], b: [], c: [], d: []};
        var result    = {};
        var bHits, cHits, dHits;

        // if no selector is given, return false
        if (selector === "") {
            return false;
        }

        // see if bHits equals the regex defined above
        while (bHits = private.regex.b.exec(selector)) {
            //console.log(bHits);
            //bHits is an array
            if (bHits[0]) {
                matches.b.push(bHits[0]);
                values.b += 1;
            }
        }

        // same as above
        while (cHits = private.regex.c.exec(selector)) {
            //console.log(cHits);
            if (cHits[0]) {
                matches.c.push(cHits[0]);
                values.c += 1;
            }
        }

        // loop over the regex hits of a global regex in a while
        // this allows to find not just matches, but captures, so
        // as to respect the regex's ?: match but not capture groups
        while (dHits = private.regex.d.exec(selector)) {
            //console.log(dHits);
            if (dHits[1]) {
                matches.d.push(dHits[1]);
            } else {
                matches.d.push(dHits[0]);
            }
            values.d += 1;
        }

        // package the result object
        result.values  = values;  
        result.string  = values.a + "," + values.b + "," + values.c + "," + values.d;
        result.matches = matches;

        return result;

    };

    public.compare = function (selector1, selector2) {
        let score1 = public.calculate(selector1).values;
        let score2 = public.calculate(selector2).values;

    }

    // return public interface
    // because this is a module.export
    return public;
    
 
})();

specify.calculate(".div #li")