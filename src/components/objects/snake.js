
class Vector {
	constructor(x=0, y=0){
		this.x = x;
		this.y = y;
	}
	set(x,y){
		this.x = x;
		this.y = y;	
	}
	add(vector){
		this.x += vector.x;
		this.y += vector.y;
	}
}

class Snake {
	constructor(center) {
		this.socket = null; 
		this.gameID = "";
		this.nickname = "";
		this.velocity = new Vector();
		this.position = new Vector(center, center);
	}

	identify(socket, gameID, nickname) {
		this.gameID = gameID;
		this.nickname = nickname;
		this.socket = socket;
	}

	updateRemotePosition() {
		const data = { 
			nickname: this.nickname,
			position: this.position,
			gameID: this.gameID,
		};
		const payload = { method: "move", data };
		this.socket.send(JSON.stringify(payload));
	}


	setupControlls() {
		console.log("Setting controlls...")
		window.addEventListener("keydown", (event) => {
			if (event.repeat) return;
			if (event.key=="ArrowLeft") {
				this.velocity.set(-1, 0);
			} else if (event.key=="ArrowUp") {
				this.velocity.set(0, -1);
			} else if (event.key=="ArrowRight") {
				this.velocity.set(1, 0);
			} else if (event.key=="ArrowDown") {
				this.velocity.set(0, 1);
			}
		});
	}

	bordersCollide(borderPosition) {
		const xcollide = this.position.x < 0 || this.position.x >= borderPosition;
		const ycollide = this.position.y < 0 || this.position.y >= borderPosition;
		return xcollide || ycollide;
	}

}

export default Snake;