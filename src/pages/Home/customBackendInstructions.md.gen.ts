const text: string = "# Using your own backend provider\n\nThe frontend (GUI) and backend (compute engine) of this web app are decoupled, allowing you to view your own data without uploading to our servers. You can also share those views with remote collaborators without uploading any data.\n\n## Create a Google Storage Bucket\n\nYou will need to [create a Google Cloud Storage Bucket](https://cloud.google.com/storage/docs/creating-buckets) to store the cached data required for rendering the front-end visualization. Note that this bucket will not need to store the large raw files.\n\nAfter creating the bucket, download the credentials to a .json file on the computer where you will be running the backend compute resource.\n\n## Install the Python package\n\nIt is recommended that you use a conda environment with `Python >=3.8`.\n\n```bash\n# After activating the conda environment\npip install --upgrade \"git+https://github.com/magland/sortingview#egg=sortingview&subdirectory=src/python\"\n```\n\n## Run the backend provider\n\nTo run the backend provider, create a startup script called `sortingview-backend.sh`, filling in the details for `name-of-google-bucket`, `path-to-google-application-credentials-json-file`, and `choose-a-label`\n\n```bash\n#!/bin/bash\n\nexport GOOGLE_BUCKET_NAME=\"name-of-google-bucket\"\nexport GOOGLE_APPLICATION_CREDENTIALS=\"path-to-google-application-credentials-json-file\"\n\nsortingview-start-backend --label choose-a-label --app-url https://sortingview.vercel.app\n```\n\nRun this script and keep it running in a terminal (you may want to use a tool like tmux). Make a note of the `Backend URI` as output from this program.\n\n## Select your custom backend provider in the app\n\nOn the main page of the app, click to specify a different backend provider, and paste in the URI obtained in the previous step."

export default text