/**
 * Classe para criação do Mapa OpenSource.
 */
class OpenMap{
	
	/**
	 * Adiciona um marker na instancia de Mapa.
	 * 
	 * @param mapid
	 * @param lat
	 * @param lon
	 * @param zoom
	 */
	constructor(mapid, lat, lon, zoom){
     
	  this.map 	= L.map(mapid).setView([lat, lon], zoom);
	
	  const url 	  = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	  const config  = {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	  };
		
      L.tileLayer(url, config).addTo(this.map);
    }
	
	/**
	 * Adiciona um marker na instancia de Mapa.
	 * 
	 * @param lat
	 * @param lon
	 * @param htmlData
	 */
	addMarker(lat, lon, htmlData){
		
		L.marker([lat, lon])
		 .addTo(this.map)
		 .bindPopup(htmlData)
		 .openPopup();
	}
}