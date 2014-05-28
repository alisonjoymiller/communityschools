<!--

$(document).ready(function () {
				var dataLayer;
              	cartodb.createVis('map', 'http://alisonjoymiller.cartodb.com/api/v2/viz/b2238d3c-d15e-11e3-bbd2-0e230854a1cb/viz.json', {
                    cartodb_logo:false,
                    zoom:13,
                    center_lat: 40.7,
                    center_lon:-73.97
                })
                .done(function (vis, layers) {
                dataLayer = layers[1].getSubLayer(1);
                dataLayer.setSQL("SELECT * FROM nyc_schools_13_14 WHERE p_total >= 1");
                });    
   
    $(function() {
    	$( document ).tooltip();
 	 });

//This is for the accordions
$(function() {
    		$( "#accordion").accordion({heightStyle:"content",active:false,collapsible:true,
    			activate:function(event,ui){dataLayer.setSQL("SELECT * FROM nyc_schools_13_14");}
    		});
    		});
    		
$(function() {
	$("#tabs").tabs();
});
	
	
// EB: added this function
            function getSQL() {
                // The idea is that we generate the SQL based on the checked boxes
                // rather than change the SQL only depending on the currently
                // checked box.

                // So first create a variable that will hold our SQL:
                var sql = "SELECT * FROM nyc_schools_13_14 WHERE ";

                // And for every checked checkbox in the partnership types, add to the WHERE clause:
                var partnershipTypeWhereClauses = [];

                // This selector only picks things in the element with id="partnership-types" and
                // are inputs that are checked.
                $('#partnership-types :input:checked').each(function () {
                    // This is something we never talked about. There are two things going on:
                    //  1. "partnershipTypeWhereClauses.push()" says "add this thing to the end of the list of partnershipTypeWhereClauses"
                    //  2. "$(this).attr('id') + ' = TRUE '" gets the checkbox's id (which is the same as the 
                    //     column name) and adds it to " = TRUE".
                    //
                    // So when p_beacon is checked, this adds "p_beacon = TRUE" to the partnershipTypeWhereClauses list.
                    partnershipTypeWhereClauses.push($(this).attr('id') + ' = TRUE');
                });

                // Finally, add our WHERE clauses to the rest of our SQL statement
                //
                // partnershipTypeWhereClauses.join() smooshes all the things in that list together
                // and puts whatever is in the () between them. So here you can see we are ANDing them
                // together. You can easily change this by changing AND to OR.
                sql = sql + partnershipTypeWhereClauses.join(' OR ');

                // You could add other where clauses here to sql before returning it.
                // For example, this might be a good place to add the "total partnerships" bit,
                // so for all the partnership types above " AND p_total >= 3":
                /*

                   if ($('#p3').is(':checked')) {
                       sql = sql + ' AND p_total >= 3';
                   }

                 */
                // And you could add another if ... for each button.

                return sql;
            }


            function getSliderSQL () {
                var frl_vals = $("#slider-range").slider("option","values");
                var chronic_vals = $("#slider-range2").slider("option","values");
                var sql1 = "SELECT * FROM nyc_schools_13_14 WHERE d_frl_pct >="+frl_vals[0]+" AND "+"d_frl_pct <="+frl_vals[1];
                var sql2 = " AND d_chronic >=" + chronic_vals[0]+" AND d_chronic <="+chronic_vals[1]; 

                return sql1+sql2;

            }

            //
            // Partnership Number Buttons
            //

            $('#p0').click(function () {
                dataLayer.setSQL("SELECT * FROM nyc_schools_13_14 WHERE p_total >= 0");
              });
            $('#p1').click(function () {
                dataLayer.setSQL("SELECT * FROM nyc_schools_13_14 WHERE p_total >= 1");
              });
            $('#p2').click(function () {
                dataLayer.setSQL("SELECT * FROM nyc_schools_13_14 WHERE p_total >= 2");
              });
            $('#p3').click(function () {
                dataLayer.setSQL("SELECT * FROM nyc_schools_13_14 WHERE p_total >= 3");
              });
            $('#p4').click(function () {
                dataLayer.setSQL("SELECT * FROM nyc_schools_13_14 WHERE p_total >= 4");
              });

//Slider
              $(function() {
                $("#slider-range").slider( {
                    range: true,
                    min: 0,
                    max: 100,
                    values: [ 0, 100 ],
                    slide: function( event, ui ) {
                        $( "#frl_amount" ).val(ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%");
                        dataLayer.setSQL(getSliderSQL());
                    }
                });
                $("#amount").val($("#slider-range").slider("values",0)+"%-"+ $("#slider-range").slider("values",1)+"%");
                
                $("#slider-range2").slider( {
                    range: true,
                    min: 0,
                    max: 100,
                    values: [0,100],
                    slide: function( event, ui ) {
                        $( "#chronic_amount" ).val(ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%");
                        dataLayer.setSQL(getSliderSQL());
                    }
                });


            });
            //
            // Partnership Indicator Check Boxes
            //
            
            // EB: added this
            $('#partnership-types :input').change(function () {
                // Since we are now doing the same thing for each checkbox, we can simplify it
                // greatly. Just get the SQL using our new function (above), and set the SQL
                // on the layer.
                var sql = getSQL();
                console.log(sql);
                if (sql != "SELECT * FROM nyc_schools_13_14 WHERE "){
                	dataLayer.setSQL(getSQL());
                } else {
                	dataLayer.setSQL("SELECT * FROM nyc_schools_13_14");
                }
                
            });

            });
            
-->