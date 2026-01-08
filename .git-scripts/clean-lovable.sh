#!/bin/sh

python3 - <<'PY'
import sys, pathlib, re
removals = ['Lovable', 'lovable', '@Lovable']
url_re = re.compile(r'https://lovable\.dev/opengraph-image-[^\s"\']*')
for p in pathlib.Path('.').rglob('*'):
    if p.is_file() and '.git' not in p.parts:
        if p.suffix.lower() in ('.html','.json','.md','.ts','.tsx','.js','.jsx','.yml','.yaml','.txt'):
            try:
                s = p.read_text()
                new = s
                for r in removals:
                    new = new.replace(r, '')
                new = url_re.sub('', new)
                if new != s:
                    p.write_text(new)
            except Exception:
                pass
PY
