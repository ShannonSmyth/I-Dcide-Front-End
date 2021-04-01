// Used to calculate the distance between two coordinates
// such as the location of a restaurant and the location of the user
var R = 6378.137; //EARTH_RADIUS
/** 
 * Calculate the distance between to coordinates
 * @param lng1  start location longitude
 * @param lat1  start location latitude
 * @param lng2  end location longitude
 * @param lat2  end location latitude
 * @return distance(kilometers) 
 */
function rad(d) {
    return d * Math.PI / 180.0;
}
function getDistance(lng1, lat1, lng2, lat2) {
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var radLng1 = rad(lng1);
    var radLng2 = rad(lng2);
    var a = radLat1 - radLat2;
    var b = radLng1 - radLng2;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        + Math.cos(radLat1) * Math.cos(radLat2)
        * Math.pow(Math.sin(b / 2), 2)));
    s = s * R;
    s = Math.round(s * 10000) / 10000;
    return s;
}
let dis = getDistance(49.267665596, -123.241999032, 49.283832198, -123.119332856);
console.log(dis)



// Used to search for coordinates within a specific distance range from a given coordinate
function findNeighPosition(lng1,lat1){
    var R = 6378.137; //EARTH_RADIUS
    var dis = getDistance(49.267665596, -123.241999032, 49.283832198, -123.119332856);//distance got last step in kilometers
    var dlng =  2*Math.asin(Math.sin(dis/(2*r))/Math.cos(lat*Math.PI/180));
    dlng = dlng*180/Math.PI;//degree to rad
    var dlat = dis/r;
    var minlat = lat1 - dlat;
	var maxlat = lat1 + dlat;
	var minlng = lng1 - dlng;
	var maxlng = lng1 + dlng;
		
	values = {minlng,maxlng,minlat,maxlat};
    list = find(hql, values);
	return list;
}
