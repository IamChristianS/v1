/// <reference path="webgl.d.ts" />

let Coin = class {
    constructor(gl, pos) {
        this.rotation = 0.0;
        this.speed = 0.1;
        this.pos = pos;
        this.exist = true;

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        this.positions = new Array();
        this.n = 30;
        var theta = 0;
        var inc = 2 * Math.PI / this.n;
        var r = 0.6;
        this.positions.push(0);
        this.positions.push(0);
        this.positions.push(0);

        for (var i = 1; i <= this.n; i++) {
            this.positions.push((r * Math.cos(theta)));
            this.positions.push(r * Math.sin(theta));
            this.positions.push(0);
            theta += inc;
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        const vertexNormals = new Array();
        for (var i = 0; i < this.n; i++) {
            vertexNormals.push(0);
            vertexNormals.push(0);
            vertexNormals.push(1);
            vertexNormals.push(0);
            vertexNormals.push(0);
            vertexNormals.push(1);
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        var indices = new Array();
        for (var i = 1; i < this.n; i++) {
            indices.push(0);
            indices.push(i);
            indices.push(i + 1);
        }
        indices.push(0);
        indices.push(this.n);
        indices.push(1);

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        var textureCoordinates = new Array();
        for (var i = 0; i < this.n; i++) {
            textureCoordinates.push(0);
            textureCoordinates.push(0);
            textureCoordinates.push(1);
            textureCoordinates.push(0);
            textureCoordinates.push(0);
            textureCoordinates.push(1);
            textureCoordinates.push(0);
            textureCoordinates.push(0);
            textureCoordinates.push(1);
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            normal: normalBuffer,
            textureCoord: textureCoordBuffer,
            indices: indexBuffer,
        }
    }

    drawCube(gl, projectionMatrix, programInfo, deltaTime) {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [1, 0, 0]);

        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        {
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.textureCoord);
            gl.vertexAttribPointer(
                programInfo.attribLocations.textureCoord,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.textureCoord);
        }

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.normal);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexNormal,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexNormal);
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        gl.useProgram(programInfo.program);

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.normalMatrix,
            false,
            normalMatrix);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, coin_texture);
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        {
            const vertexCount = 3 * this.n;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
};