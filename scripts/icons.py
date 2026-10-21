"""Render the project's original domino icon at platform-required sizes (Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw
import io

def icon(size):
 im=Image.new('RGB',(1024,1024),'#102b27');d=ImageDraw.Draw(im)
 d.rounded_rectangle((312,128,712,896),radius=56,fill='#fff8e7',outline='#c9a65b',width=24)
 d.line((352,512,672,512),fill='#887e65',width=12)
 for x in (420,604):
  for y in (240,336,432,608,704,800):d.ellipse((x-30,y-30,x+30,y+30),fill='#10261f')
 return im.resize((size,size),Image.Resampling.LANCZOS)
for size in (180,192,512):icon(size).save(f'dist/icon-{size}.png')
for p in list(Path('android/app/src/main/res').glob('mipmap-*/*.png'))+list(Path('ios/App/App/Assets.xcassets/AppIcon.appiconset').glob('*.png')):
 with Image.open(p) as im: size=im.width
 icon(size).save(p)
