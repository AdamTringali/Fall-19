// make sure node and npm is install. Open the terminal in visual studio code and type "node app.js" to run the file

console.log("hello world")

class WebsiteTypo{
    constructor()
    {
        this.website = "www.google.com"
        this.typo_list = new Array();
    }

    /*
    (1) Missing-dot typos: The “.” following “www” is
    removed, e.g., wwwSouthwest.com.
    */
    missing_dot()
    {
        let missing_str = this.website
        missing_str = missing_str.slice(0, 3) + missing_str.slice(4);
        this.typo_list.push(missing_str);
      
    }

    /*
    (2) Character-omission typos: Characters are omitted
    one at a time, e.g., Diney.com and MarthStewart.com.
    */
    char_omission()
    {
      
    }

    /*
    (3) Character-permutation typos: Consecutive
    characters are swapped one pair at a time, unless they
    are the same characters, e.g., NYTiems.com.
    */
    char_permut()
    {
       
    }

    /*
    (4) Character-replacement typos: characters are
    replaced one at a time and the replacement is selected
    from the set of characters adjacent to the given character
    on the standard keyboard, e.g., DidneyWorld.com and
    USATodsy.com.
    */

    char_replace()
    {
      
    }
    /*
    (5) Character-insertion typos: characters are inserted
    one at a time and the inserted character is chosen from
    the set of characters adjacent to either of the given pair
    on the standard keyboard (and including the given pair),
    e.g., WashingtonPoost.com and Googlle.com.
    */

    char_insert()
    {
      
    }
}


web = new WebsiteTypo()
web.missing_dot()
console.log("Testing missing_dot")
console.log(web.typo_list)
web.typo_list = new Array()
web.char_omission()
console.log("Testing char_omission")
console.log(web.typo_list)
web.typo_list = new Array()
web.char_permut()
console.log("Testing char_permut")
console.log(web.typo_list)
web.typo_list = new Array()
web.char_replace()
console.log("Testing char_replace")
console.log(web.typo_list)
web.typo_list = new Array()
web.char_insert()
console.log("Testing char_insert")
console.log(web.typo_list)
web.typo_list = new Array()

