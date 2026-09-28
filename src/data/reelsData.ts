import type { Reel } from '../types/reel';

export const INITIAL_REELS_DATA: Reel[] = [
  {
    id: 'reel-1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41589-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    ambientColor: '#6366f1',
    secondaryColor: '#06b6d4',
    creator: {
      id: 'creator-1',
      name: 'Rahul Sharma',
      handle: '@rahul_dev',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      role: 'Full Stack AI Developer',
      verified: true,
      followersCount: 14200,
      isFollowing: false,
      github: 'https://github.com/rahul-sharma',
      portfolio: 'https://rahul.dev',
    },
    skill: 'Full Stack & LLM Systems',
    project: {
      title: 'NeuralResume: Real-time ATS Analyzer',
      tagline: 'Built an AI-powered resume analyzer using React + Node.js + LLM',
      description: 'Engineered a sub-second semantic ATS parser matching candidates against 50,000+ job vectors with structured score breakdown and AST rewrite suggestions.',
      githubRepo: 'https://github.com/skilltego/neural-resume',
      liveDemoUrl: 'https://neuralresume.preview.live',
      performanceMetric: '99.4% Parser Accuracy · 240ms latency',
      codeSnippet: {
        language: 'typescript',
        fileName: 'resumeParser.engine.ts',
        code: `import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantClient } from "@qdrant/js-client-rest";

export async function matchResumeVector(pdfBuffer: Buffer, jobVector: number[]) {
  const parsedAST = await extractSemanticTokens(pdfBuffer);
  const similarity = cosineDistance(parsedAST.embeddings, jobVector);
  
  return {
    matchScore: Math.round(similarity * 100),
    actionableSuggestions: generateOptimizations(parsedAST.gapTokens)
  };
}`,
      },
    },
    metrics: {
      likes: 3840,
      comments: 294,
      shares: 1120,
      saves: 1890,
      views: '48.2K',
    },
    isLiked: false,
    isSaved: false,
    tags: ['React', 'Node.js', 'LLM', 'Qdrant', 'TypeScript'],
    commentsList: [
      {
        id: 'c-1',
        author: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        role: 'Tech Lead @ Prisma',
        timestamp: '2h ago',
        content: 'The AST parser response time is crazy fast! Did you use worker threads for PDF tokenization?',
        likes: 42,
      },
      {
        id: 'c-2',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        role: 'Staff Engineer',
        timestamp: '5h ago',
        content: 'This solves real ATS blackbox problems. Sending this over to our recruitment team!',
        likes: 18,
      },
      {
        id: 'c-3',
        author: 'Aria Chen',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        role: 'Product Designer',
        timestamp: '1d ago',
        content: 'Loved how clean the breakdown chart is inside the demo.',
        likes: 9,
      },
    ],
  },
  {
    id: 'reel-2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cyber-security-system-analyzing-code-41584-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    ambientColor: '#a855f7',
    secondaryColor: '#ec4899',
    creator: {
      id: 'creator-2',
      name: 'Maya Lin',
      handle: '@mayalindesign',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      role: 'Creative Technologist & 3D Dev',
      verified: true,
      followersCount: 28900,
      isFollowing: true,
      github: 'https://github.com/mayalin-3d',
      portfolio: 'https://maya.graphics',
    },
    skill: 'WebGL & Creative Shaders',
    project: {
      title: 'CosmicMesh: Interactive Raymarched Metaverse',
      tagline: 'Procedural GLSL Raymarching running at 120 FPS on Mobile WebGL',
      description: 'Built a real-time reactive volumetric universe reacting to Web Audio frequencies with zero texture assets and sub-50KB bundle size.',
      githubRepo: 'https://github.com/skilltego/cosmic-mesh',
      liveDemoUrl: 'https://cosmicmesh.webgl.art',
      performanceMetric: '120 FPS · 38 KB Bundle · WebGPU ready',
      codeSnippet: {
        language: 'glsl',
        fileName: 'volumetricRaymarch.frag',
        code: `// SDF Raymarching with dynamic audio distortion
float mapScene(vec3 p, float uTime, float audioFreq) {
    vec3 q = mod(p + 2.0, 4.0) - 2.0;
    float sphere = length(q) - (0.8 + 0.3 * sin(uTime * 2.0 + audioFreq));
    float wave = sin(p.x * 3.0) * cos(p.y * 3.0) * 0.15;
    return sphere + wave;
}`,
      },
    },
    metrics: {
      likes: 6420,
      comments: 512,
      shares: 3410,
      saves: 4200,
      views: '92.4K',
    },
    isLiked: true,
    isSaved: true,
    tags: ['Three.js', 'WebGL', 'GLSL', 'WebAudio', 'Math'],
    commentsList: [
      {
        id: 'c-201',
        author: 'Devon Miles',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        role: '3D Art Director',
        timestamp: '1h ago',
        content: 'The lighting on that SDF field is buttery smooth. What post-processing stack did you use?',
        likes: 65,
      },
      {
        id: 'c-202',
        author: 'Sora Tanaka',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        role: 'Frontend Architect',
        timestamp: '3h ago',
        content: '38KB bundle?! That is true engineering art.',
        likes: 31,
      },
    ],
  },
  {
    id: 'reel-3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-keyboard-41586-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    ambientColor: '#10b981',
    secondaryColor: '#06b6d4',
    creator: {
      id: 'creator-3',
      name: 'David Kalu',
      handle: '@davidk_cloud',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
      role: 'Distributed Systems & Go Specialist',
      verified: true,
      followersCount: 9400,
      isFollowing: false,
      github: 'https://github.com/davidkalu-infra',
      portfolio: 'https://kalu.io',
    },
    skill: 'High-Throughput Go & Raft',
    project: {
      title: 'VortexKV: 1.2M QPS Distributed Cache',
      tagline: 'Zero-allocation memory store with Raft consensus and SIMD hashing',
      description: 'Created a blazing fast distributed in-memory key-value engine with multi-raft partition rebalancing and zero lock contention using lockless ringbuffers.',
      githubRepo: 'https://github.com/skilltego/vortex-kv',
      liveDemoUrl: 'https://vortexkv.benchmarks.cloud',
      performanceMetric: '1.28M QPS · 0.12ms p99 · 0 GC Pauses',
      codeSnippet: {
        language: 'go',
        fileName: 'ringbuffer.go',
        code: `package vortex

import "sync/atomic"

type RingBuffer struct {
    mask    uint64
    head    atomic.Uint64
    tail    atomic.Uint64
    entries []Entry
}

func (rb *RingBuffer) PushLockless(e Entry) bool {
    head := rb.head.Load()
    tail := rb.tail.Load()
    if head - tail >= uint64(len(rb.entries)) {
        return false // full
    }
    rb.entries[head & rb.mask] = e
    rb.head.Add(1)
    return true
}`,
      },
    },
    metrics: {
      likes: 2910,
      comments: 188,
      shares: 940,
      saves: 1530,
      views: '34.8K',
    },
    isLiked: false,
    isSaved: false,
    tags: ['Go', 'Raft', 'Concurrency', 'Distributed', 'Linux'],
    commentsList: [
      {
        id: 'c-301',
        author: 'Zack Miller',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        role: 'Database Kernel Engineer',
        timestamp: '4h ago',
        content: 'Lockless ringbuffer implementation in Go is tricky with false sharing. Did you add cache line padding?',
        likes: 54,
      },
    ],
  },
  {
    id: 'reel-4',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hacker-working-on-his-computer-41585-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    ambientColor: '#f59e0b',
    secondaryColor: '#ef4444',
    creator: {
      id: 'creator-4',
      name: 'Sofia Valdes',
      handle: '@sofia_vision',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      role: 'Autonomous Systems & Edge AI',
      verified: true,
      followersCount: 19800,
      isFollowing: false,
      github: 'https://github.com/sofia-robotics',
      portfolio: 'https://sofiavaldes.ai',
    },
    skill: 'Edge AI & Spatial Vision',
    project: {
      title: 'DroneSight: 60FPS On-Device Object Tracking',
      tagline: 'Quantized PyTorch + TensorRT model running on low-power Raspberry Pi 5',
      description: 'Real-time multi-agent spatial tracking and 3D trajectory projection under harsh weather using dynamic exposure compensation algorithms.',
      githubRepo: 'https://github.com/skilltego/dronesight-edge',
      liveDemoUrl: 'https://dronesight.spatial.ai',
      performanceMetric: '62 FPS @ 4.2 Watts · 12ms Inference',
      codeSnippet: {
        language: 'python',
        fileName: 'edge_tracker.py',
        code: `import torch
import tensorrt as trt

def track_spatial_vectors(frame_tensor, kalman_filter):
    with torch.inference_mode():
        detections = trt_engine(frame_tensor)
        tracked_objects = kalman_filter.update(detections.boxes)
        return tracked_objects.compute_3d_projected_coords()`,
      },
    },
    metrics: {
      likes: 5120,
      comments: 340,
      shares: 2150,
      saves: 3100,
      views: '71.0K',
    },
    isLiked: false,
    isSaved: false,
    tags: ['Python', 'TensorRT', 'PyTorch', 'Robotics', 'Edge AI'],
    commentsList: [
      {
        id: 'c-401',
        author: 'Liam Vance',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        role: 'Robotics Fellow @ Stanford',
        timestamp: '6h ago',
        content: 'Getting 60+ FPS on a Pi 5 is astounding. The INT8 calibration dataset must have been immaculate!',
        likes: 38,
      },
    ],
  },
  {
    id: 'reel-5',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41589-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    ambientColor: '#06b6d4',
    secondaryColor: '#3b82f6',
    creator: {
      id: 'creator-5',
      name: 'Kai Takahashi',
      handle: '@kai_craft',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      role: 'Staff UI Engineer & Design Systems',
      verified: true,
      followersCount: 31500,
      isFollowing: true,
      github: 'https://github.com/kai-craft',
      portfolio: 'https://kaicraft.design',
    },
    skill: 'Design Systems & Motion Physics',
    project: {
      title: 'Aura UI: Spring-Physics Component Kit',
      tagline: 'Accessible, zero-runtime CSS variables + gesture-driven physics engine',
      description: 'Crafted 45+ fluid interactive components with fluid spatial drag handles, dynamic spring damping, and sub-pixel optical alignments.',
      githubRepo: 'https://github.com/skilltego/aura-ui',
      liveDemoUrl: 'https://aura-ui.design.live',
      performanceMetric: '100/100 Lighthouse · 0 Layout Shifts · 100% WCAG AAA',
      codeSnippet: {
        language: 'typescript',
        fileName: 'springGesture.ts',
        code: `export function createSpringPhysics(config = { tension: 170, friction: 26 }) {
  return {
    interpolate: (current: number, target: number, dt: number) => {
      const force = -config.tension * (current - target);
      return current + force * (dt / 1000);
    }
  };
}`,
      },
    },
    metrics: {
      likes: 8320,
      comments: 670,
      shares: 4890,
      saves: 5900,
      views: '115K',
    },
    isLiked: true,
    isSaved: true,
    tags: ['React', 'Design Systems', 'Motion', 'Accessibility', 'CSS'],
    commentsList: [
      {
        id: 'c-501',
        author: 'Chloe Dupont',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        role: 'Design Director',
        timestamp: '1h ago',
        content: 'This has replaced our internal UI primitives at our studio. Flawless physics!',
        likes: 89,
      },
    ],
  },
];
