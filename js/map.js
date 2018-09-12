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
	
	/**
	 * Executa a limpeza do mapa
	 */
	clearMap(){
		throw new Error("Método não implementado.");
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
		throw new Error("Método não implementado.");
	}
	
	/**
	 * Adiciona o Zoom no marker
	 * 
	 * @param marker
	 */
	addZoom(marker){
		throw new Error("Método não implementado.");
	}
	
	/**
	 * Adiciona o Zoom em um conjunto de Markers
	 */
	addBounds(){
		throw new Error("Método não implementado.");
	}
	
	/**
	 * Adiciona um Popup no Marker.
	 * 
	 * @returns Polyline
	 */
	addPolyline(){
		throw new Error("Método não implementado.");
	}
}