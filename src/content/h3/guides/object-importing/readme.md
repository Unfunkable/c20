---
title: H3 object importing hub
keywords:
  - modeling
  - exporter
  - importing
  - render model
  - physics model
  - collision model
  - animations
  - device
  - device machine
thanks:
  PepperMan: Writing this page.
redirects:
  - /h3/object-importing
---
This page will serve as the hub for custom object importing guides. As of right now, these guides have been written for Blender users, although those with knowledge in other 3D modeling programs such as Max may be able to follow along, and export to [FBX](~).

{% alert %}
The guides below show you how to create and import a simple cuboid shape into Halo. However, should you wish, you can follow along using whatever 3D model you would like.
{% /alert %}

# Understanding the data directory
[Data directory](~object-file-directories)

In this section we will be covering how to setup proper folder structures for our assets in the H3EK data folder. This section does not cater to a specific 3D software and can be read by anyone.

# Blender preparation
[Preparing your Blender scene](~blender-prep)

The next section will cover the common settings you should mess with when working in Blender. If you already have a solid grasp of what you should configure in Blender then go ahead and skip this section. 

# Render model creation and importing
[Making and importing a custom object render model](~blender-object-creation-render)

The next section will show the user how to create a simple custom object render mesh that can be imported in Halo to make a valid scenery object.

# Importing custom textures
[How to set up Materials in Blender for use in Halo](~blender-object-creation-materials)

This section will go over how to set up materials within Blender for use on custom objects in Halo 3. This will explain naming conventions, using custom textures, the basics of UV unwrapping, and shader and bitmap tag creation in Guerilla.

# Creating a physics model
[How to create a custom physics model for the platform](~blender-object-creation-physics)

This tutorial will go over the basics of physics models, the differences between physics and collision models, an explanation of strictly-convex shapes, and a step by step guide on how to make a basic physics model.

# Adding custom animations (basic)
[How to add a custom animation to the platform](~blender-object-creation-animation)

This page will describe how to create and export simple animations for scenery objects, as well as covering some of the basics of how animations work in Blam!

# Device machines
[Explaining device machines, and how to make a custom one](~blender-object-creation-device-machines)

A guide covering what `.device_machine` tags are, how they work, and converting our platform into a device machine with a new animation made from scratch.