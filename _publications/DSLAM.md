---
title: "RGB-D SLAM in Dynamic Environments Using Point Correlation"
collection: publications
permalink: /publication/DSLAM
date: 2018-11-08
# venue: 'Journal 1'
paperurl: 'https://arxiv.org/pdf/1811.03217'
citation: 'Weichen Dai, Yu Zhang, Ping Li, Zheng Fang.'
---

[[ArXiv]](https://arxiv.org/pdf/1811.03217)

## Abstract
This paper proposed a novel RGB-D SLAM method for dynamic environments. It follows traditional feature-based SLAM methods and utilizes a feature groups segmentation method to resist the disturbance caused by the dynamic objects using points correlations. The correlations between map points represented with a sparse graph are created by Delaunay triangulation. After removing non-consistency connections, the dynamic objects are separated from static background. The features only in the static map are used for motion estimation and bundle adjustment which improves the accuracy and robustness of SLAM in dynamic environments. The effectiveness of the proposed SLAM are evaluated using TUM RGB-D benchmark. The experiments demonstrate that the dynamic features are successfully removed and the system work perfectly in both low and high dynamic environments. The comparisons between proposed method and state-of-the-art visual systems clearly show that the comparable accurate results are achieved in low dynamic environments and the performance is improved significantly in high dynamic environments.