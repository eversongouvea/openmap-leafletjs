class Map{
	
	constructor(lat, lon, zoom){
		this._latlng = [lat, lon];
		this._zoom 	 = zoom;
	}
	
	/**
	 * Retorna a Lat/Lng inicial do Mapa
	 * 
	 * @returns latLng
	 */
	getLatlng(){
		return this._latlng;
	}
	
	/**
	 * Retorna o Zoom inicial do Mapa
	 * 
	 * @returns zoom
	 */
	getZoom(){
		return this._zoom;
	}
}

/**
 * Classe para criação do Mapa OpenSource.
 */
class OpenMap extends Map{
	
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
		
		const url 	= "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
		const config  = {
		     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		};
		  
		this._markers  = [];
		this._polyline = {};
		
		this.map = L.map(mapid).setView(this.getLatlng(), this.getZoom());
		 	
	    L.tileLayer(url, config).addTo(this.map);
	}
	
	clearMap(){
		
		for(var i = 0; i < this._markers.length; i++){
			
			this._markers[i].remove()
		}
		
		this._markers = [];
		
		if(this._polyline instanceof L.Polyline)
			this._polyline.remove();
		
		this.map.setView(this.getLatlng(), this.getZoom());
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
		
		options.title = title;
		
		if(icon !== undefined)
			options.icon = L.icon({iconUrl: icon, iconSize: [32, 37]});
				
		let marker = L.marker([lat, lon], options).addTo(this.map);
		
		this._markers.push(marker);
				
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
	 * Adiciona o Zoom em um conjunto de Markers
	 */
	addBounds(){
		this.map.fitBounds(L.latLngBounds(this._markers.map(marker => marker._latlng)));
	}
	
	/**
	 * Adiciona um Popup no Marker.
	 * 
	 * @returns Polyline
	 */
	addPolyline(){
		
		var latlngs = this._markers.map(marker => marker._latlng);
		
		this._polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.map);
		
		this.map.fitBounds(this._polyline.getBounds());
		
		return this._polyline;
	}
}