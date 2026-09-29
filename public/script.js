/**
 * Cloudflare Workers Static Assets - Edge Interaction Script
 * Zero dependencies, pure ES6
 */
(function () {
  'use strict';

  // DOM Elements
  const app = document.getElementById('app');
  const statusBadge = document.getElementById('status-badge');
  const btnAction = document.getElementById('btn-action');
  const btnClear = document.getElementById('clear-btn');
  const clickCount = document.getElementById('click-count');
  const logConsole = document.getElementById('log-console');
  const logCounter = document.getElementById('log-counter');
  const stateIndicator = document.getElementById('state-indicator');

  // Application State
  let count = 0;
  const logs = [];

  /**
   * Update visual state badge and indicator
   * @param {'ready' | 'loading' | 'success' | 'error'} state
   * @param {string} text
   */
  function setState(state, text) {
    if (!stateIndicator) return;
    stateIndicator.className = `state-badge state-${state}`;
    stateIndicator.textContent = text;
  }

  /**
   * Render logs to the console element
   */
  function renderLogs() {
    if (!logConsole) return;

    if (logs.length === 0) {
      logConsole.textContent = 'Waiting for edge events...';
      logConsole.classList.add('empty-state');
    } else {
      logConsole.classList.remove('empty-state');
      logConsole.textContent = logs.join('\n');
      logConsole.scrollTop = logConsole.scrollHeight;
    }

    if (logCounter) {
      logCounter.textContent = `${logs.length} ${logs.length === 1 ? 'entry' : 'entries'}`;
    }
  }

  /**
   * Format ISO timestamp: YYYY-MM-DDTHH:mm:ss.sssZ
   * @returns {string}
   */
  function getIsoTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Handle Ping Edge Event action
   */
  function handlePingEvent() {
    if (!btnAction || btnAction.disabled) return;

    // Loading State
    btnAction.disabled = true;
    setState('loading', 'Dispatching');

    // Simulate async edge roundtrip
    setTimeout(() => {
      try {
        count += 1;
        if (clickCount) {
          clickCount.textContent = String(count);
        }

        const timestamp = getIsoTimestamp();
        const logEntry = `[${timestamp}] INFO: Edge event #${count} processed via Cloudflare Workers isolate (p95: ~12ms)`;
        logs.push(logEntry);

        renderLogs();
        setState('success', 'Acknowledged');

        setTimeout(() => {
          setState('ready', 'Ready');
        }, 1200);
      } catch (err) {
        setState('error', 'Failed');
        const errTimestamp = getIsoTimestamp();
        logs.push(`[${errTimestamp}] ERROR: Failed to process event: ${err.message}`);
        renderLogs();
      } finally {
        btnAction.disabled = false;
        btnAction.focus();
      }
    }, 150);
  }

  /**
   * Handle Clear / Reset Logs action
   */
  function handleClearLogs() {
    logs.length = 0;
    count = 0;
    if (clickCount) {
      clickCount.textContent = '0';
    }
    renderLogs();
    setState('ready', 'Cleared');
  }

  // Event Listeners
  if (btnAction) {
    btnAction.addEventListener('click', handlePingEvent);
  }

  if (btnClear) {
    btnClear.addEventListener('click', handleClearLogs);
  }

  // Initial render
  renderLogs();
  setState('ready', 'Ready');
})();
