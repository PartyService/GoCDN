var background = require('./assets.js').background;

var wisfolder = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GoCDN</title>

  <!-- MDC Theme -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/theme@13.0.0/dist/mdc.theme.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/card@9.0.0/dist/mdc.card.min.css">

  <!-- Custom CSS -->
  <style>
    :root {
      --mdc-theme-primary: #84d2e6;
      --mdc-theme-secondary: #bec4eb;
      --mdc-theme-background: #191c1d;
      --mdc-theme-surface: #293234;
      --mdc-theme-on-primary: #FFFFFF;
      --mdc-theme-on-secondary: #000000;
      --mdc-theme-on-background: #FFFFFF;
      --mdc-theme-on-surface: #FFFFFF;
    }

    body {
      background-color: var(--mdc-theme-background);
      color: var(--mdc-theme-on-background);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      font-family: sans-serif;
    }

    .mdc-card {
      width: 400px;
      padding: 16px;
      text-align: center;
    }

    .mdc-card__title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .mdc-card__subtitle {
      font-size: 16px;
      margin-bottom: 16px;
    }

    .mdc-card__media {
      height: 200px;
      background-image: url('${background.card1}');
      background-size: cover;
      background-position: center;
    }

    @media (max-width: 600px) {
      .mdc-card {
        width: 100%;
      }
    }
  </style>
</head>

<body>
  <div class="mdc-card">
    <div class="mdc-card__media"></div>
    <h2 class="mdc-card__title">403 Forbidden</h2>
    <h3 class="mdc-card__subtitle">Unfortunately, it seems that this website has some strict security measures in place and won't let us explore the CDN folder trees. I know, it's a bummer :/. But hey, let's not get discouraged! We can still find plenty of exciting content elsewhere on the website. Who knows what hidden gems we might discover?</h3>
  </div>

  <!-- MDC Script -->
  <script src="https://cdn.jsdelivr.net/npm/@material/ripple@9.0.0/dist/mdc.ripple.min.js"></script>
  <script>
    // Initialize MDC Ripples
    const ripples = [].map.call(document.querySelectorAll('.mdc-button, .mdc-fab, .mdc-icon-button, .mdc-card__primary-action'), function(el) {
      return new mdc.ripple.MDCRipple(el);
    });
  </script>
</body>

</html>
`
var w404 = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Not Found</title>

    <!-- MDC Theme -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/theme@13.0.0/dist/mdc.theme.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/card@9.0.0/dist/mdc.card.min.css">

    <!-- Custom CSS -->
    <style>
        :root {
            --mdc-theme-primary: #84d2e6;
            --mdc-theme-secondary: #bec4eb;
            --mdc-theme-background: #191c1d;
            --mdc-theme-surface: #293234;
            --mdc-theme-on-primary: #FFFFFF;
            --mdc-theme-on-secondary: #000000;
            --mdc-theme-on-background: #FFFFFF;
            --mdc-theme-on-surface: #FFFFFF;
        }

        body {
            background-color: var(--mdc-theme-background);
            color: var(--mdc-theme-on-background);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: sans-serif;
        }

        .mdc-card {
            width: 400px;
            padding: 16px;
            text-align: center;
        }

        .mdc-card__title {
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 16px;
        }

        .mdc-card__subtitle {
            font-size: 16px;
            margin-bottom: 16px;
        }

        .mdc-card__media {
            height: 200px;
            background-image: url('${background.card2}');
            background-size: cover;
            background-position: center;
        }

        @media (max-width: 600px) {
            .mdc-card {
                width: 100%;
            }
        }
    </style>
</head>

<body>
    <div class="mdc-card">
        <div class="mdc-card__media"></div>
        <h2 class="mdc-card__title">File Not Found</h2>
        <h3 class="mdc-card__subtitle">Seems like someone is on a wild goose chase trying to access a non-existent file. By any chance, were you attempting to explore our CDN? Sorry to break it to you, but unauthorized access is not permitted. But fear not, there are still plenty of other gems to discover on our website. Let's stick to the permitted paths, shall we?</h3>
    </div>

    <!-- MDC Script -->
    <script src="https://cdn.jsdelivr.net/npm/@material/ripple@9.0.0/dist/mdc.ripple.min.js"></script>
    <script>
        // Initialize MDC Ripples
        const ripples = [].map.call(document.querySelectorAll('.mdc-button, .mdc-fab, .mdc-icon-button, .mdc-card__primary-action'), function (el) {
            return new mdc.ripple.MDCRipple(el);
        });
    </script>
</body>

</html>`

var w500 = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Internal Server Error</title>

  <!-- MDC Theme -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/theme@13.0.0/dist/mdc.theme.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@material/card@9.0.0/dist/mdc.card.min.css">

  <!-- Custom CSS -->
  <style>
    :root {
      --mdc-theme-primary: #84d2e6;
      --mdc-theme-secondary: #bec4eb;
      --mdc-theme-background: #191c1d;
      --mdc-theme-surface: #293234;
      --mdc-theme-on-primary: #FFFFFF;
      --mdc-theme-on-secondary: #000000;
      --mdc-theme-on-background: #FFFFFF;
      --mdc-theme-on-surface: #FFFFFF;
    }

    body {
      background-color: var(--mdc-theme-background);
      color: var(--mdc-theme-on-background);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      font-family: sans-serif;
    }

    .mdc-card {
      width: 400px;
      padding: 16px;
      text-align: center;
    }

    .mdc-card__title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .mdc-card__subtitle {
      font-size: 16px;
      margin-bottom: 16px;
    }

    .mdc-card__media {
      height: 200px;
      background-image: url('${background.card3}');
      background-size: cover;
      background-position: center;
    }

    @media (max-width: 600px) {
      .mdc-card {
        width: 100%;
      }
    }
  </style>
</head>

<body>
  <div class="mdc-card">
    <div class="mdc-card__media"></div>
    <h2 class="mdc-card__title">Internal Server Error</h2>
    <h3 class="mdc-card__subtitle">Looks like we might have a pesky webpage bug causing some trouble. By the way, did you happen to try exploring our CDN? I'm sorry to inform you that it's off-limits to unauthorized personnel. But don't worry, we can still have a great time exploring the other areas of our website together!</h3>
    <h3 class="mdc-card__subtitle">{ERROR-FIELD}</h3>
  </div>

  <!-- MDC Script -->
  <script src="https://cdn.jsdelivr.net/npm/@material/ripple@9.0.0/dist/mdc.ripple.min.js"></script>
  <script>
    // Initialize MDC Ripples
    const ripples = [].map.call(document.querySelectorAll('.mdc-button, .mdc-fab, .mdc-icon-button, .mdc-card__primary-action'), function(el) {
      return new mdc.ripple.MDCRipple(el);
    });
  </script>
</body>

</html>
`

module.exports = {
    w404, w500, wisfolder
}