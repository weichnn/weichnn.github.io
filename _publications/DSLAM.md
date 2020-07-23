---
title: "RGB-D SLAM in Dynamic Environments Using Point Correlation"
collection: publications
permalink: /publication/DSLAM
date: 2020-07-20
# venue: 'Journal 1'
paperurl: 'https://ieeexplore.ieee.org/document/9145704'
# citation: 'Weichen Dai, Yu Zhang, Ping Li, Zheng Fang, and Sebastian Scherer.'
---

## Abstract
In this paper, a simultaneous localization and mapping (SLAM) method that eliminates the influence of moving objects in dynamic environments is proposed. This method utilizes the correlation between map points to separate points that are part of the static scene and points that are part of different moving objects into different groups. A sparse graph is first created using Delaunay triangulation from all map points. In this graph, the vertices represent map points, and each edge represents the correlation between adjacent points. If the relative position between two points remains consistent over time, there is correlation between them, and they are considered to be moving together rigidly. If not, they are considered to have no correlation and to be in separate groups. After the edges between the uncorrelated points are removed during point-correlation optimization, the remaining graph separates the map points of the moving objects from the map points of the static scene. The largest group is assumed to be the group of reliable static map points. Finally, motion estimation is performed using only these points. The proposed method was implemented for RGB-D sensors, evaluated with a public RGB-D benchmark, and tested in several additional challenging environments. The experimental results demonstrate that robust and accurate performance can be achieved by the proposed SLAM method in both slightly and highly dynamic environments. Compared with other state-of-the-art methods, the proposed method can provide competitive accuracy with good real-time performance.