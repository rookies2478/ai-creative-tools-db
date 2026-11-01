import assert from 'node:assert/strict';
import {
  CANONICAL_PRODUCTION_HOSTNAME,
  shouldInitializeMeasurement,
  minimizeDestinationUrl,
} from '../src/utils/measurementSafety.mjs';

assert.equal(CANONICAL_PRODUCTION_HOSTNAME, 'aicreative-db.com');
assert.equal(shouldInitializeMeasurement('aicreative-db.com', true), true);
assert.equal(shouldInitializeMeasurement('aicreative-db.com', false), false);
assert.equal(shouldInitializeMeasurement('www.aicreative-db.com', true), false);
assert.equal(shouldInitializeMeasurement('task-example.ai-creative-db.pages.dev', true), false);
assert.equal(shouldInitializeMeasurement('localhost', true), false);

assert.equal(
  minimizeDestinationUrl('https://example.com/path/to/page?utm_source=test&email=user%40example.com#pricing'),
  'https://example.com/path/to/page'
);
assert.equal(
  minimizeDestinationUrl('/tools/runway/?ref=test#cta', 'https://aicreative-db.com/current/'),
  'https://aicreative-db.com/tools/runway/'
);
assert.equal(minimizeDestinationUrl('mailto:test@example.com'), '');
assert.equal(minimizeDestinationUrl('not a valid url', 'not a valid base'), '');

console.log('measurement-safety tests PASS');
