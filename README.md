# scatter-charts-comparison
This repository contains 3 different implementations of scatter plot. For comparison, each html page implement a scatter plot containing 100,000 circles whose radius are 1 and color is #26963c. The positions are generated randomly. 

- index1.html: It contains a \<svg\> node and 100,000 \<circle\> children, which is generated by pre-render.js with node.js.
- index2.html: It contains a \<svg\> node and a piece of JavaScript/D3.js code to render the \<circle\> nodes dynamically. 
- index3.html: It contains a \<canvas\> node with a piece of JavaScript code to draw the points.