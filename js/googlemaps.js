/**
 * Contrato para API do GoogleMaps 
 */
class GoogleMaps extends Map{

	/**
	 * Adiciona um marker na instância de Mapa.
	 * 
	 * @param lat
	 * @param lon
	 * @param zoom
	 * @param mapid
	 */
	constructor(lat, lon, zoom, mapid){
		
		super(lat, lon, zoom);
		  
		this._markers  = [];
		this._polyline = {};
		
		 var mpOptions =  {zoom: 4, 
				   		   center: new google.maps.LatLng(lat, lon), 
				   		   mapTypeId: google.maps.MapTypeId.ROADMAP};

		 this._map = new google.maps.Map(mapid, mpOptions);
	}
}