<!DOCTYPE html>
<html>
<head>
    <title>Revelation Compiler v1.0</title>
    <style>
        body { 
            font-family: 'Courier New', monospace; 
            background: #0a0a0a; 
            color: #00ff00; 
            padding: 20px; 
        }
        .header { 
            text-align: center; 
            border: 2px solid #00ff00; 
            padding: 20px; 
            margin-bottom: 30px; 
        }
        .scan-button { 
            background: #00ff00; 
            color: #000; 
            border: none; 
            padding: 15px 30px; 
            font-size: 18px; 
            cursor: pointer; 
            margin: 10px; 
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔍 REVELATION COMPILER v1.0</h1>
        <p>Real-time Divine Event Monitoring System</p>
        <p style="color: #ffff00;">STATUS: ONLINE ✅</p>
    </div>
    
    <div style="text-align: center;">
        <button class="scan-button" onclick="alert('Divine monitoring scan initiated! 🚨')">
            🚨 RUN DIVINE MONITORING SCAN
        </button>
    </div>
</body>
</html>```javascript
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Main dashboard route
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Revelation Compiler v1.0</title>
            <style>
                body { 
                    font-family: 'Courier New', monospace; 
                    background: #0a0a0a; 
                    color: #00ff00; 
                    padding: 20px; 
                }
                .header { 
                    text-align: center; 
                    border: 2px solid #00ff00; 
                    padding: 20px; 
                    margin-bottom: 30px; 
                }
                .scan-button { 
                    background: #00ff00; 
                    color: #000; 
                    border: none; 
                    padding: 15px 30px; 
                    font-size: 18px; 
                    cursor: pointer; 
                    margin: 10px; 
                }
                .results { 
                    margin-top: 20px; 
                    border: 1px solid #00ff00; 
                    padding: 15px; 
                }
                .status { 
                    color: #ffff00; 
                    font-weight: bold; 
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🔍 REVELATION COMPILER v1.0</h1>
                <p>Real-time Divine Event Monitoring System</p>
                <p class="status">STATUS: ONLINE ✅</p>
            </div>
            
            <div style="text-align: center;">
                <button class="scan-button" onclick="runScan()">
                    🚨 RUN DIVINE MONITORING SCAN
                </button>
                <button class="scan-button" onclick="viewResults()">
                    📊 VIEW LATEST RESULTS
                </button>
            </div>
            
            <div id="results" class="results" style="display: none;">
                <h3>Scan Results Loading...</h3>
                <div id="output"></div>
            </div>

            <script>
                async function runScan() {
                    document.getElementById('results').style.display = 'block';
                    document.getElementById('output').innerHTML = '🔄 Running divine event scan...';
                    
                    try {
                        const response = await fetch('/run-scan', { method: 'POST' });
                        const result = await response.text();
                        document.getElementById('output').innerHTML = '<pre>' + result + '</pre>';
                    } catch (error) {
                        document.getElementById('output').innerHTML = '❌ Error: ' + error.message;
                    }
                }
                
                async function viewResults() {
                    document.getElementById('results').style.display = 'block';
                    document.getElementById('output').innerHTML = '📁 Loading latest results...';
                    
                    try {
                        const response = await fetch('/latest-results');
                        const data = await response.json();
                        document.getElementById('output').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                    } catch (error) {
                        document.getElementById('output').innerHTML = '❌ No results found yet. Run a scan first!';
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// API endpoint to run the Reddit scan
app.post('/run-scan', (req, res) => {
    console.log('🚨 Manual scan triggered from dashboard');
    
    exec('node reddit-scraper.js', (error, stdout, stderr) => {
        if (error) {
            console.error('Scan error:', error);
            res.status(500).send('Scan failed: ' + error.message);
            return;
        }
        
        console.log('✅ Scan completed successfully');
        res.send(stdout);
    });
});

// API endpoint to get latest results
app.get('/latest-results', (req, res) => {
    try {
        const files = fs.readdirSync('.').filter(f => f.startsWith('scan-') && f.endsWith('.json'));
        if (files.length === 0) {
            return res.status(404).json({ error: 'No scan results found' });
        }
        
        const latestFile = files.sort().reverse()[0];
        const data = JSON.parse(fs.readFileSync(latestFile, 'utf8'));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load results' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'REVELATION_COMPILER_ONLINE',
        timestamp: new Date().toISOString(),
        message: 'Divine monitoring system operational'
    });
});

app.listen(PORT, () => {
    console.log('🚀 REVELATION COMPILER v1.0 ONLINE');
    console.log(`📡 Dashboard: http://localhost:${PORT}`);
    console.log('🔍 Divine event monitoring system ready');
});
```
