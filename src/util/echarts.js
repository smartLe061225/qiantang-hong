const echartsConfig = {
	color: ['#00c35c','#0e7ccf','#ffd900','#b7a3df','#e55e7e','#ffc0c0','#ff9a23','#f1c2e6','#f8c66e','#26a9e6','#8be0db','#ff6b08'],
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