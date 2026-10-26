# Descarga las fotos de las bicicletas Scott y Megamo desde bicicentro.com.do
# Úsalo desde la carpeta del catálogo:  powershell -ExecutionPolicy Bypass -File .\fuente\descargar-fotos-bicicentro.ps1
$ErrorActionPreference = "Continue"
$destino = Join-Path $PSScriptRoot "fotos-bicicentro"
New-Item -ItemType Directory -Force -Path $destino | Out-Null
$fotos = @(
  @{ id = "scott-contrail-20-2027"; url = "https://bicicentro.com.do/wp-content/uploads/2026/10/7b91c07e-0232-4a60-8a1f-605f81012383.jpg"; ext = ".jpg" },
  @{ id = "scott-contrail-20-275"; url = "https://bicicentro.com.do/wp-content/uploads/2025/10/15993.png"; ext = ".png" },
  @{ id = "scott-contrail-20-negra"; url = "https://bicicentro.com.do/wp-content/uploads/2025/10/15993.png"; ext = ".png" },
  @{ id = "scott-scale-50"; url = "https://bicicentro.com.do/wp-content/uploads/2026/10/2286408.jpg"; ext = ".jpg" },
  @{ id = "scott-scale-20-carbono"; url = "https://bicicentro.com.do/wp-content/uploads/2026/10/4275758537A-1.jpg"; ext = ".jpg" },
  @{ id = "scott-scale-920"; url = "https://bicicentro.com.do/wp-content/uploads/2026/09/1291.webp"; ext = ".webp" },
  @{ id = "scott-scale-930"; url = "https://bicicentro.com.do/wp-content/uploads/2026/01/16228.png"; ext = ".png" },
  @{ id = "scott-scale-935"; url = "https://bicicentro.com.do/wp-content/uploads/2025/10/1.jpg"; ext = ".jpg" },
  @{ id = "scott-scale-970"; url = "https://bicicentro.com.do/wp-content/uploads/2024/12/BICICLETAS-35.jpg"; ext = ".jpg" },
  @{ id = "scott-scale-960"; url = "https://bicicentro.com.do/wp-content/uploads/2023/03/290183_2.jpg"; ext = ".jpg" },
  @{ id = "scott-scale-960-naranja"; url = "https://bicicentro.com.do/wp-content/uploads/2023/11/Sin-titulo-1-1-3.jpg"; ext = ".jpg" },
  @{ id = "scott-spark-rc-world-cup-2027"; url = "https://bicicentro.com.do/wp-content/uploads/2026/10/4283388086.jpg"; ext = ".jpg" },
  @{ id = "scott-spark-rc-team-issue"; url = "https://bicicentro.com.do/wp-content/uploads/2026/10/4283393020.jpg"; ext = ".jpg" },
  @{ id = "scott-spark-rc-team"; url = "https://bicicentro.com.do/wp-content/uploads/2026/10/4275488585.jpg"; ext = ".jpg" },
  @{ id = "scott-spark-rc-expert"; url = "https://bicicentro.com.do/wp-content/uploads/2026/10/4275478350.jpg"; ext = ".jpg" },
  @{ id = "scott-spark-rc-comp-2027"; url = "https://bicicentro.com.do/wp-content/uploads/2026/10/4275490002.jpg"; ext = ".jpg" },
  @{ id = "scott-spark-rc-sl"; url = "https://bicicentro.com.do/wp-content/uploads/2026/03/16454-9.png"; ext = ".png" },
  @{ id = "scott-spark-910"; url = "https://bicicentro.com.do/wp-content/uploads/2026/01/1291.jpg"; ext = ".jpg" },
  @{ id = "scott-spark-rc-wc-evo"; url = "https://bicicentro.com.do/wp-content/uploads/2025/08/15419-1.png"; ext = ".png" },
  @{ id = "scott-spark-970"; url = "https://bicicentro.com.do/wp-content/uploads/2024/07/1332-1.png"; ext = ".png" },
  @{ id = "scott-spark-rc-wc-axs"; url = "https://bicicentro.com.do/wp-content/uploads/2023/11/1285.png"; ext = ".png" },
  @{ id = "scott-spark-960"; url = "https://bicicentro.com.do/wp-content/uploads/2022/05/Sin-titulo-1.jpg"; ext = ".jpg" },
  @{ id = "scott-spark-rc-comp-azul"; url = "https://bicicentro.com.do/wp-content/uploads/2023/06/1332.png"; ext = ".png" },
  @{ id = "scott-spark-rc-900-pro"; url = "https://bicicentro.com.do/wp-content/uploads/2023/06/1372.png"; ext = ".png" },
  @{ id = "scott-foil-rc-20"; url = "https://bicicentro.com.do/wp-content/uploads/2026/03/16252.png"; ext = ".png" },
  @{ id = "scott-foil-rc-10"; url = "https://bicicentro.com.do/wp-content/uploads/2026/03/16249.png"; ext = ".png" },
  @{ id = "scott-foil-rc-10-b"; url = "https://bicicentro.com.do/wp-content/uploads/2025/05/1-1.jpg"; ext = ".jpg" },
  @{ id = "scott-foil-rc-pro"; url = "https://bicicentro.com.do/wp-content/uploads/2025/05/1.jpg"; ext = ".jpg" },
  @{ id = "scott-foil-rc-20-b"; url = "https://bicicentro.com.do/wp-content/uploads/2024/11/293182_2030147_3.jpg"; ext = ".jpg" },
  @{ id = "scott-foil-rc-10-c"; url = "https://bicicentro.com.do/wp-content/uploads/2024/02/1.jpg"; ext = ".jpg" },
  @{ id = "scott-addict-rc-pro"; url = "https://bicicentro.com.do/wp-content/uploads/2023/10/Sin-titulo-1-16.jpg"; ext = ".jpg" },
  @{ id = "scott-addict-rc-15"; url = "https://bicicentro.com.do/wp-content/uploads/2023/11/Sin-titulo-1-1-2.jpg"; ext = ".jpg" },
  @{ id = "scott-speedster-30"; url = "https://bicicentro.com.do/wp-content/uploads/2023/03/4907.png"; ext = ".png" },
  @{ id = "scott-speedster-20"; url = "https://bicicentro.com.do/wp-content/uploads/2023/03/290377_3-1.jpg"; ext = ".jpg" },
  @{ id = "megamo-reason-al-07"; url = "https://bicicentro.com.do/wp-content/uploads/2026/10/b9bb0d78-4b06-4d27-9391-2628ce9ef1dc.jpg"; ext = ".jpg" },
  @{ id = "megamo-reason-crb-03-axs"; url = "https://bicicentro.com.do/wp-content/uploads/2026/10/79b1effe-a52b-4d59-ae10-5a8164d601d3-megamo_reason_33878.jpg"; ext = ".jpg" },
  @{ id = "megamo-flame-crb-01-race"; url = "https://bicicentro.com.do/wp-content/uploads/2026/02/16112-3.png"; ext = ".png" },
  @{ id = "megamo-flame-crb-10"; url = "https://bicicentro.com.do/wp-content/uploads/2026/02/16109-1-1.png"; ext = ".png" },
  @{ id = "megamo-reason-crb-01"; url = "https://bicicentro.com.do/wp-content/uploads/2026/09/producto-1790044952552.jpg"; ext = ".jpg" },
  @{ id = "scott-patron-eride-930"; url = "https://bicicentro.com.do/wp-content/uploads/2026/03/16235-9.png"; ext = ".png" },
  @{ id = "scott-solace-gravel-20"; url = "https://bicicentro.com.do/wp-content/uploads/2026/01/16265.png"; ext = ".png" },
  @{ id = "scott-patron-eride-900"; url = "https://bicicentro.com.do/wp-content/uploads/2023/11/Patron.jpg"; ext = ".jpg" },
  @{ id = "scott-lumen-eride-900"; url = "https://bicicentro.com.do/wp-content/uploads/2023/10/1410-1.png"; ext = ".png" },
  @{ id = "scott-patron-eride-910"; url = "https://bicicentro.com.do/wp-content/uploads/2026/01/16261.png"; ext = ".png" },
  @{ id = "scott-patron-eride-920"; url = "https://bicicentro.com.do/wp-content/uploads/2026/01/16253.png"; ext = ".png" },
  @{ id = "scott-strike-eride-940"; url = "https://bicicentro.com.do/wp-content/uploads/2023/11/Sin-titulo-1-2-3.jpg"; ext = ".jpg" },
  @{ id = "scott-voltage-eride-900"; url = "https://bicicentro.com.do/wp-content/uploads/2024/11/4913.png"; ext = ".png" }
)
$ok = 0; $fallas = @()
foreach ($f in $fotos) {
  $archivo = Join-Path $destino ($f.id + $f.ext)
  if ((Test-Path $archivo) -and ((Get-Item $archivo).Length -gt 5000)) { $ok++; continue }
  try {
    Invoke-WebRequest -Uri $f.url -OutFile $archivo -UseBasicParsing -TimeoutSec 60 -Headers @{ "User-Agent" = "Mozilla/5.0"; "Referer" = "https://bicicentro.com.do/" }
    $ok++
    Write-Host ("OK     " + $f.id)
  } catch {
    $fallas += $f.id
    Write-Host ("FALLÓ  " + $f.id + "  " + $_.Exception.Message) -ForegroundColor Red
  }
  Start-Sleep -Milliseconds 400
}
Write-Host ""
Write-Host ("Descargadas: " + $ok + " de " + $fotos.Count)
if ($fallas.Count -gt 0) { Write-Host ("Fallaron: " + ($fallas -join ", ")) -ForegroundColor Red }
