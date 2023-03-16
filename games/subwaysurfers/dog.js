/// <reference path="webgl.d.ts" />

let Dog = class {
    constructor(gl, pos) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        this.positions = [
            // Front face
            -0.25, -0.25, 0.25,
            0.25, -0.25, 0.25,
            0.25, 0.25, 0.25,
            -0.25, 0.25, 0.25,
            //Back Face
            -0.25, -0.25, -0.25,
            0.25, -0.25, -0.25,
            0.25, 0.25, -0.25,
            -0.25, 0.25, -0.25,
            //Top Face
            -0.25, 0.25, -0.25,
            0.25, 0.25, -0.25,
            0.25, 0.25, 0.25,
            -0.25, 0.25, 0.25,
            //Bottom Face
            -0.25, -0.25, -0.25,
            0.25, -0.25, -0.25,
            0.25, -0.25, 0.25,
            -0.25, -0.25, 0.25,
            //Left Face
            -0.25, -0.25, -0.25,
            -0.25, 0.25, -0.25,
            -0.25, 0.25, 0.25,
            -0.25, -0.25, 0.25,
            //Right Face
            0.25, -0.25, -0.25,
            0.25, 0.25, -0.25,
            0.25, 0.25, 0.25,
            0.25, -0.25, 0.25,

            // // Front face
            // -0.15, 0.1, 0.15,
            // 0.15, 0.1, 0.15,
            // 0.15, 0.6, 0.15,
            // -0.15, 0.6, 0.15,
            // //Back Face
            // -0.15, 0.1, -0.15,
            // 0.15, 0.1, -0.15,
            // 0.15, 0.6, -0.15,
            // -0.15, 0.6, -0.15,
            // //Top Face
            // -0.15, 0.6, -0.15,
            // 0.15, 0.6, -0.15,
            // 0.15, 0.6, 0.15,
            // -0.15, 0.6, 0.15,
            // //Bottom Face
            // -0.15, 0.1, -0.15,
            // 0.15, 0.1, -0.15,
            // 0.15, 0.1, 0.15,
            // -0.15, 0.1, 0.15,
            // //Left Face
            // -0.15, 0.1, -0.15,
            // -0.15, 0.6, -0.15,
            // -0.15, 0.6, 0.15,
            // -0.15, 0.1, 0.15,
            // //Right Face
            // 0.15, 0.1, -0.15,
            // 0.15, 0.6, -0.15,
            // 0.15, 0.6, 0.15,
            // 0.15, 0.1, 0.15,
        ];

        this.rotation = 0.0;
        this.speedx = 0;
        this.speedy = 0.05;
        this.speedz = 0;
        this.pos = pos;
        this.jumping_boots = false;
        this.fly_boost = false;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        const indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23,

            // 24, 25, 26, 24, 26, 27,
            // 28, 29, 30, 28, 30, 31,
            // 32, 33, 34, 32, 34, 35,
            // 36, 37, 38, 36, 38, 39,
            // 40, 41, 42, 40, 42, 43,
            // 44, 45, 46, 44, 46, 47,
        ];

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        const textureCoordinates = [
            // Front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Back
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Top
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Right
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,

            // // Front
            // 0.0, 0.0,
            // 1.0, 0.0,
            // 1.0, 1.0,
            // 0.0, 1.0,
            // // Back
            // 0.0, 0.0,
            // 1.0, 0.0,
            // 1.0, 1.0,
            // 0.0, 1.0,
            // // Top
            // 0.0, 0.0,
            // 1.0, 0.0,
            // 1.0, 1.0,
            // 0.0, 1.0,
            // // Bottom
            // 0.0, 0.0,
            // 1.0, 0.0,
            // 1.0, 1.0,
            // 0.0, 1.0,
            // // Right
            // 0.0, 0.0,
            // 1.0, 0.0,
            // 1.0, 1.0,
            // 0.0, 1.0,
            // // Left
            // 0.0, 0.0,
            // 1.0, 0.0,
            // 1.0, 1.0,
            // 0.0, 1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        const vertexNormals = [
            // Front
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            // Back
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            // Top
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            // Bottom
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            // Right
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            // Left
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,

            // // Front
            // 0.0, 0.0, 1.0,
            // 0.0, 0.0, 1.0,
            // 0.0, 0.0, 1.0,
            // 0.0, 0.0, 1.0,
            // // Back
            // 0.0, 0.0, -1.0,
            // 0.0, 0.0, -1.0,
            // 0.0, 0.0, -1.0,
            // 0.0, 0.0, -1.0,
            // // Top
            // 0.0, 1.0, 0.0,
            // 0.0, 1.0, 0.0,
            // 0.0, 1.0, 0.0,
            // 0.0, 1.0, 0.0,
            // // Bottom
            // 0.0, -1.0, 0.0,
            // 0.0, -1.0, 0.0,
            // 0.0, -1.0, 0.0,
            // 0.0, -1.0, 0.0,
            // // Right
            // 1.0, 0.0, 0.0,
            // 1.0, 0.0, 0.0,
            // 1.0, 0.0, 0.0,
            // 1.0, 0.0, 0.0,
            // // Left
            // 1.0, 0.0, 0.0,
            // 1.0, 0.0, 0.0,
            // 1.0, 0.0, 0.0,
            // 1.0, 0.0, 0.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);

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
        gl.bindTexture(gl.TEXTURE_2D, dog_texture);
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        {
            const vertexCount = 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
        cubeRotation += deltaTime;
    }
};