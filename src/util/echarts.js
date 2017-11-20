const echartsConfig = {
	color: ['#00c35c','#0e7ccf','#ffd900','#b7a3df','#e55e7e'],
	setColor(params){
        return this.color[params];
	},
	resize(obj){
		window.addEventListener('resize', function() {
          obj.resize()
        }.bind(this))
	}
}

export default echartsConfig;