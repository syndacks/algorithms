//-------Challenge 3----------
// Calculate the weights of two CSS selectors and determine which of them
// will supersede the other
//----------------------------

var specify = (function () {

	// pubic object that will get returned
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

    // calculate method gets added to public
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
            // bHits is an array, and the matched from .exec is always first 
            // element in array, hence [0]
            if (bHits[0]) {
                matches.b.push(bHits[0]);
                values.b += 1;
            }
        }

        // same as above
        while (cHits = private.regex.c.exec(selector)) {
            // cHits is an array, and the matched from .exec is always first 
            // element in array, hence [0]
            if (cHits[0]) {
                matches.c.push(cHits[0]);
                values.c += 1;
            }
        }

        // same as above, except loop over the regex hits of a global regex
        // which allows to find not just matches, but captures, so
        // as to respect the regex's ?: match but not capture groups
        while (dHits = private.regex.d.exec(selector)) {
            if (dHits[1]) {
                matches.d.push(dHits[1]);
            } else {
                matches.d.push(dHits[0]);
            }
            values.d += 1;
        }

        // package the result object
        result.values  = values;  
        result.string  = values.a + "," + values.b + "," + values.c + "," 
        	+ values.d;
        result.matches = matches;

        return result;

    };

    // compare two CSS selectors and determine which has higher specificity:
	    // if first selector wins, returns 1
	    // if second selector wins, returns -1
	    // if they are equal weight, return 0

    public.compare = function (selector1, selector2) {
        var score1 = public.calculate(selector1).values;
        var score2 = public.calculate(selector2).values;
        // map the Object keys into an array
        var score1Array = Object.keys(score1).map(function(key){
        	return score1[key];
        });
        var score2Array = Object.keys(score2).map(function(key){
        	return score2[key];
        });
    

    for (i = 0; i < 4; i ++) {
		if (score1Array[i] < score2Array[i]) {
			console.log("The second selector wins!")
			return -1;
		} else if (score1Array[i] > score2Array[i]) {
			console.log("The first selector wins!")
			return 1;
		}
	}
	
	return 0;

	};

return public;
    
 
}());

// specify.compare(".body", "#li")
// specify.compare("#body", ".li")
// specify.compare(".body", ".li")