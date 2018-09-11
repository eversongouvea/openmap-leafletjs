/**
 * Classe para criação do Mapa OpenSource.
 */
class OpenMap{
	
	/**
	 * Adiciona um marker na instância de Mapa.
	 * 
	 * @param mapid
	 * @param lat
	 * @param lon
	 * @param zoom
	 */
	constructor(mapid, lat, lon, zoom){
     
		  const url 	= "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
		  const config  = {
		        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		  };
			
		  this.markers  = [];
		  this.polyline = {};
		  
		  this.initialPoint = [lat, lon];
		  this.defaultView  = {initialPoint: this.initialPoint, zoom: zoom}
		  
		  this.map = L.map(mapid).setView(this.initialPoint, zoom);
		 	
	      L.tileLayer(url, config).addTo(this.map);
	}
	
	/**
	 * Executa a limpeza do Mapa
	 */
	clearMap(){
		
		for(var i = 0; i < this.markers.length; i++){
			this.markers[i].remove();
		}
		
		if(this.polyline instanceof L.Polyline)
			this.polyline.remove();
		
		this.markers  = [];
		
		this.map.setView(this.defaultView.initialPoint, this.defaultView.zoom);
	}
	
	/**
	 * Adiciona um marker na instância de Mapa.
	 * 
	 * @param lat
	 * @param lon
	 * @param title
	 * @param htmlTemplate
	 * @param icon
	 * @returns Marker
	 */
	addMarker(lat, lon, title, htmlTemplate, icon){
		
		var options = new Object();
		
		options.title =  title;
		
		if(icon !== undefined)
			options.icon = L.icon({iconUrl: icon, iconSize: [32, 37]});
				
		let marker = L.marker([lat, lon], options)
		 			  .addTo(this.map);

		this.markers.push(marker);
		
		if(htmlTemplate !== undefined)
			marker.bindPopup(htmlTemplate).openPopup();
		
		return marker;
	}
	
	/**
	 * Adiciona o Zoom no marker
	 */
	addZoom(marker){
		this.map.setView(marker._latlng, 20);
	}
	
	/**
	 * Adiciona o Zoom no marker
	 */
	addBounds(){
		this.map.fitBounds(L.latLngBounds(this.markers.map(marker => marker._latlng)));
	}
	
	/**
	 * Adiciona um Poup no Marker.
	 * 
	 * @returns Polyline
	 */
	addPolyline(){
		
		var latlngs = this.markers.map(marker => marker._latlng);
		
		this.polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.map);
		
		this.map.fitBounds(this.polyline.getBounds());
		
		return this.polyline;
	}
}