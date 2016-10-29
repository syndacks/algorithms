var specify = (function () {

    // pubic object that will eventually get returned
    var public    = {};
    // private object for regex calculations
    var private   = {};

    private.regex = {

        // ids - any letter a-z multiple times, 
        b: /#[a-z]+/gi,

        // classes and attributes
        c: /\.[a-z]+|\[[^\]]*\]/gi,

        // tags and pseudo classes
        d: /(?:^| |>|\+|~)+([a-z_-]+)|(?:\:([a-z]+))/gi

    };

    //calculate method gets added to public
    public.calculate = function (selector) {
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
            //bHits is an array, and the matched from .exec is always first element in array, hence [0]
            if (bHits[0]) {
                matches.b.push(bHits[0]);
                values.b += 1;
            }
        }

        // same as above
        while (cHits = private.regex.c.exec(selector)) {
            //console.log(cHits);
            //cHits is an array, and the matched from .exec is always first element in array, hence [0]
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

	/**
	 * Compares two CSS selectors for specificity
	 *
	 *  - it returns -1 if selector1 has a lower specificity than selector2
	 *  - it returns 1 if selector1 has a higher specificity than selector2
	 *  - it returns 0 if selector1 has the same specificity as selector2
	 */

    public.compare = function (selector1, selector2) {
        var score1 = public.calculate(selector1).values;
        var score2 = public.calculate(selector2).values;
        // need to map the Object keys into an array
        var score1Array = Object.keys(score1).map(function(key){return score1[key];});
        var score2Array = Object.keys(score2).map(function(key){return score2[key];});
    

    for (i = 0; i < 4; i ++) {
			if (score1Array[i] < score2Array[i]) {
				console.log("The second selector wins!")
				return -1;
			} else if (score1Array[i] > score2Array[i]) {
				consoel.log("The first selector wins!")
				return 1;
			}
		}
	};

    // return public interface
    // because this is a module.export
    return public;
    
 
}());